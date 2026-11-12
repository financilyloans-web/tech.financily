"use client";

import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import * as THREE from "three";
import { prefersReducedMotion } from "@/lib/tokens";

export type ParticleGlobeHandle = {
  /** 0 = globe, 1 = grid, 2 = ledger (drives the morph uniforms). */
  setMorph: (x: number) => void;
};

const VERT = /* glsl */ `
  attribute vec3 aA;
  attribute vec3 aB;
  attribute vec3 aC;
  attribute float aSize;
  attribute float aSeed;
  uniform vec2 uMorph;
  uniform float uTime;
  varying float vAlpha;
  void main() {
    vec3 pos = mix(aA, aB, uMorph.x);
    pos = mix(pos, aC, uMorph.y);
    vec4 mv = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mv;
    float d = -mv.z;
    gl_PointSize = aSize * (88.0 / d);
    float twinkle = 0.5 + 0.5 * sin(uTime * 2.2 + aSeed * 41.0);
    vAlpha = smoothstep(7.0, 2.6, d) * twinkle;
  }
`;

const FRAG = /* glsl */ `
  precision mediump float;
  uniform vec3 uColor;
  varying float vAlpha;
  void main() {
    vec2 c = gl_PointCoord - 0.5;
    float d = length(c);
    float a = smoothstep(0.5, 0.06, d);
    if (a < 0.011) discard;
    gl_FragColor = vec4(uColor * 1.05, a * vAlpha * 0.8);
  }
`;

const LINE_VERT = /* glsl */ `
  attribute vec3 aA;
  attribute vec3 aB;
  attribute vec3 aC;
  uniform vec2 uMorph;
  uniform float uFade;
  varying float vFade;
  void main() {
    vec3 pos = mix(aA, aB, uMorph.x);
    pos = mix(pos, aC, uMorph.y);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    vFade = uFade;
  }
`;

const LINE_FRAG = /* glsl */ `
  precision mediump float;
  uniform vec3 uColor;
  varying float vFade;
  void main() {
    gl_FragColor = vec4(uColor, 0.12 * vFade);
  }
`;

function clamp01(v: number) {
  return Math.min(1, Math.max(0, v));
}

function slerp(a: THREE.Vector3, b: THREE.Vector3, t: number) {
  const c = Math.acos(clamp01(a.dot(b)));
  const s = Math.sin(c);
  if (s < 1e-5) return a.clone();
  return a
    .clone()
    .multiplyScalar(Math.sin((1 - t) * c) / s)
    .add(b.clone().multiplyScalar(Math.sin(t * c) / s));
}

/**
 * Data-globe: thousands of particles + glowing arcs rendered with a custom
 * GLSL shader. Morphs globe -> grid -> ledger via uMorph (scrubbed by scroll).
 * Mouse moves the camera (parallax + drift). DPR-capped, pauses off-screen.
 */
const ParticleGlobe = forwardRef<ParticleGlobeHandle>((_props, ref) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const morphRef = useRef(0);

  useImperativeHandle(ref, () => ({
    setMorph: (x: number) => {
      morphRef.current = x;
    },
  }));

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const reduced = prefersReducedMotion();
    const R = 1.6;
    const COUNT = 3000;

    // ---- build three position states + arcs ----
    const A: number[] = [];
    const B: number[] = [];
    const C: number[] = [];
    const sizes: number[] = [];
    const seeds: number[] = [];

    const spherePts: THREE.Vector3[] = [];

    for (let i = 0; i < COUNT; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const dir = new THREE.Vector3(
        Math.sin(phi) * Math.cos(theta),
        Math.sin(phi) * Math.sin(theta),
        Math.cos(phi)
      );
      const sp = dir.clone().multiplyScalar(R);
      A.push(sp.x, sp.y, sp.z);
      spherePts.push(sp.clone());

      const gx = (Math.random() * 2 - 1) * 2.0;
      const gz = (Math.random() * 2 - 1) * 1.2;
      const gy = (Math.random() * 2 - 1) * 0.04;
      B.push(gx, gy, gz);

      const row = Math.floor(Math.random() * 14);
      const col = Math.floor(Math.random() * 22);
      const lx = (col / 21) * 3.6 - 1.8;
      const ly = 1.6 - (row / 13) * 3.2;
      const lz = (Math.random() * 2 - 1) * 0.4;
      C.push(lx, ly, lz);

      sizes.push(0.7 + Math.random() * 1.6);
      seeds.push(Math.random());
    }

    // arcs — connect random sphere points with great-circle polylines
    const arcPosA: number[] = [];
    const arcPosB: number[] = [];
    const arcPosC: number[] = [];
    const ARC_N = 40;
    for (let a = 0; a < ARC_N; a++) {
      const i = Math.floor(Math.random() * COUNT);
      const j = Math.floor(Math.random() * COUNT);
      const p = spherePts[i].clone().normalize();
      const q = spherePts[j].clone().normalize();
      const segs = 26;
      const bi = i * 3;
      const bj = j * 3;
      for (let s = 0; s <= segs; s++) {
        const t = s / segs;
        const spherePt = slerp(p, q, t).multiplyScalar(R);
        arcPosA.push(spherePt.x, spherePt.y, spherePt.z);
        arcPosB.push(
          B[bi] + (B[bj] - B[bi]) * t,
          B[bi + 1] + (B[bj + 1] - B[bi + 1]) * t,
          B[bi + 2] + (B[bj + 2] - B[bi + 2]) * t
        );
        arcPosC.push(
          C[bi] + (C[bj] - C[bi]) * t,
          C[bi + 1] + (C[bj + 1] - C[bi + 1]) * t,
          C[bi + 2] + (C[bj + 2] - C[bi + 2]) * t
        );
        if (s < segs) {
          const k = s * 3;
          // two triangles? no — line segments connect consecutive vertices.
        }
      }
    }

    // ---- renderer / scene / camera ----
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.set(0, 0, 5.6);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false });
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
    mount.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    // points
    const pointGeo = new THREE.BufferGeometry();
    pointGeo.setAttribute("position", new THREE.BufferAttribute(Float32Array.from(A), 3));
    pointGeo.setAttribute("aA", new THREE.BufferAttribute(Float32Array.from(A), 3));
    pointGeo.setAttribute("aB", new THREE.BufferAttribute(Float32Array.from(B), 3));
    pointGeo.setAttribute("aC", new THREE.BufferAttribute(Float32Array.from(C), 3));
    pointGeo.setAttribute("aSize", new THREE.BufferAttribute(Float32Array.from(sizes), 1));
    pointGeo.setAttribute("aSeed", new THREE.BufferAttribute(Float32Array.from(seeds), 1));

    const colorHex = 0xb6ff3c;

    const pointMat = new THREE.ShaderMaterial({
      vertexShader: VERT,
      fragmentShader: FRAG,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uMorph: { value: new THREE.Vector2(0, 0) },
        uTime: { value: 0 },
        uColor: { value: new THREE.Color(colorHex) },
      },
    });
    const points = new THREE.Points(pointGeo, pointMat);
    group.add(points);

    // arcs (line segments)
    const linePos = arcPosA;
    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute("position", new THREE.BufferAttribute(Float32Array.from(linePos), 3));
    lineGeo.setAttribute("aA", new THREE.BufferAttribute(Float32Array.from(arcPosA), 3));
    lineGeo.setAttribute("aB", new THREE.BufferAttribute(Float32Array.from(arcPosB), 3));
    lineGeo.setAttribute("aC", new THREE.BufferAttribute(Float32Array.from(arcPosC), 3));
    const lineMat = new THREE.ShaderMaterial({
      vertexShader: LINE_VERT,
      fragmentShader: LINE_FRAG,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uMorph: { value: new THREE.Vector2(0, 0) },
        uFade: { value: 1 },
      },
    });
    const arcs = new THREE.LineSegments(lineGeo, lineMat);
    group.add(arcs);

    // ---- pointer / parallax ----
    const target = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };
    const onPointer = (e: PointerEvent) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = (e.clientY / window.innerHeight) * 2 - 1;
      target.x = nx;
      target.y = ny;
    };
    window.addEventListener("pointermove", onPointer, { passive: true });

    // ---- sizing ----
    const resize = () => {
      const w = mount.clientWidth || 1;
      const h = mount.clientHeight || 1;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(mount);

    // ---- animation ----
    let raf = 0;
    let running = true;
    const time = { t: 0 };

    const loop = () => {
      time.t += 0.008;

      current.x += (target.x - current.x) * 0.04;
      current.y += (target.y - current.y) * 0.04;

      group.rotation.y += 0.0014;
      group.rotation.x = THREE.MathUtils.lerp(group.rotation.x, current.y * 0.18, 0.04);
      camera.position.x = THREE.MathUtils.lerp(camera.position.x, -current.x * 0.5, 0.04);
      camera.position.y = THREE.MathUtils.lerp(camera.position.y, current.y * 0.3, 0.04);
      camera.lookAt(0, 0, 0);

      const m = morphRef.current;
      const mx = clamp01(m);
      const my = clamp01(Math.max(0, m - 1));
      (pointMat.uniforms.uMorph.value as THREE.Vector2).set(mx, my);
      (lineMat.uniforms.uMorph.value as THREE.Vector2).set(mx, my);
      (lineMat.uniforms.uFade.value as number) = 1 - Math.min(1, m * 1.4);
      pointMat.uniforms.uTime.value = time.t;

      renderer.render(scene, camera);
      raf = requestAnimationFrame(loop);
    };

    // pause off-screen
    const io = new IntersectionObserver((entries) => {
      const visible = entries[0]?.isIntersecting ?? true;
      if (visible && !running) {
        running = true;
        raf = requestAnimationFrame(loop);
      } else if (!visible && running) {
        running = false;
        cancelAnimationFrame(raf);
      }
    }, { threshold: 0.05 });
    io.observe(mount);

    if (reduced) {
      pointMat.uniforms.uTime.value = 0;
      renderer.render(scene, camera);
    } else {
      raf = requestAnimationFrame(loop);
    }

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      window.removeEventListener("pointermove", onPointer);
      pointGeo.dispose();
      pointMat.dispose();
      lineGeo.dispose();
      lineMat.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) mount.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0"
      aria-hidden="true"
      style={{
        WebkitMaskImage: "radial-gradient(circle at 50% 50%, black 42%, transparent 80%)",
        maskImage: "radial-gradient(circle at 50% 50%, black 42%, transparent 80%)",
      }}
    />
  );
});

ParticleGlobe.displayName = "ParticleGlobe";
export default ParticleGlobe;

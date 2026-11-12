/**
 * Financily Technologies
 *
 * This environment blocks Next's native SWC binary (the sandbox's Application
 * Control policy refuses to load `@next/swc-*.node`). Next.js automatically
 * falls back to Babel when a `babel.config.js` exists, so we opt in here to
 * compile the app with the pure-JS Babel pipeline instead of SWC.
 *
 * `next/babel` is Next's official preset — it wires up @babel/preset-env,
 * preset-react (automatic JSX runtime) and preset-typescript, plus the
 * styled-jsx transform and Next-specific plugins.
 */
module.exports = {
  presets: ["next/babel"],
};

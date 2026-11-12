"use client";

import { useState, type FormEvent } from "react";
import Section from "@/components/ui/Section";
import GlassCard from "@/components/ui/GlassCard";
import Magnetic from "@/components/motion/Magnetic";
import Button from "@/components/ui/Button";
import cn from "@/lib/cn";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);

  function validate() {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Name is required.";
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) e.email = "Enter a valid email.";
    if (form.message.trim().length < 10) e.message = "Tell us a little more (10+ chars).";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function submit(ev: FormEvent) {
    ev.preventDefault();
    if (!validate()) return;
    setSent(true);
  }

  const field = (key: keyof typeof form, label: string, area = false) => (
    <div className="flex flex-col gap-2">
      <label htmlFor={key} className="font-mono text-xs tracking-[0.2em] text-muted uppercase">{label}</label>
      {area ? (
        <textarea id={key} rows={5} value={form[key]} onChange={(e) => setForm({ ...form, [key]: e.target.value })}
          className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-paper outline-none transition-colors focus:border-cyan" />
      ) : (
        <input id={key} type={key === "email" ? "email" : "text"} value={form[key]} onChange={(e) => setForm({ ...form, [key]: e.target.value })}
          className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-paper outline-none transition-colors focus:border-cyan" />
      )}
      {errors[key] && <p className="text-xs text-red-400">{errors[key]}</p>}
    </div>
  );

  return (
    <main className="pt-32">
      <Section eyebrow="Contact" title="Let's build the future together." sub="Tell us about your idea — we reply within one business day.">
        <div className="mx-auto max-w-2xl">
          {sent ? (
            <GlassCard className="text-center py-16">
              <div className="text-6xl">✓</div>
              <h3 className="mt-4 font-display text-2xl font-bold text-aurora">Message sent</h3>
              <p className="mt-2 text-muted">We'll be in touch shortly.</p>
            </GlassCard>
          ) : (
            <form onSubmit={submit} className="glass space-y-6 p-8" noValidate>
              <div className={cn("grid gap-6", "sm:grid-cols-2")}>
                {field("name", "Name")}
                {field("email", "Email")}
              </div>
              {field("message", "Message", true)}
              <Magnetic>
                <Button type="submit" variant="primary" className="w-full">Send message</Button>
              </Magnetic>
            </form>
          )}
        </div>
      </Section>
    </main>
  );
}

"use client";

import { useState } from "react";
import { buildWhatsAppUrl } from "@/src/lib/utils";

/**
 * Set your business WhatsApp number here (international format, digits only).
 * e.g. 919876543210 for +91 98765 43210
 */
const WHATSAPP_NUMBER = "919876543210";

const FIELDS = [
  { name: "firstName", label: "First name", type: "text", required: true, half: true },
  { name: "surname", label: "Surname", type: "text", required: true, half: true },
  { name: "email", label: "E-mail", type: "email", required: true, half: true },
  { name: "phone", label: "Telephone", type: "tel", required: true, half: true },
];

export default function ContactForm() {
  const [values, setValues] = useState({
    firstName: "",
    surname: "",
    email: "",
    phone: "",
    message: "",
  });
  const [status, setStatus] = useState("idle"); // idle | submitting | error

  function update(e) {
    setValues((v) => ({ ...v, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("submitting");

    const name = `${values.firstName} ${values.surname}`.trim();
    const lead = {
      name,
      email: values.email,
      phone: values.phone,
      message: values.message,
    };

    // Log to Google Sheets (best-effort — never block the redirect).
    try {
      await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(lead),
      });
    } catch {
      // ignore — we still send them to WhatsApp
    }

    const text =
      `Hi BOHO Studio, I'd like to talk about a project.\n\n` +
      `Name: ${name}\n` +
      `Email: ${values.email}\n` +
      `Phone: ${values.phone}\n` +
      (values.message ? `Message: ${values.message}` : "");

    window.location.href = buildWhatsAppUrl(WHATSAPP_NUMBER, text);
  }

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-10">
      {FIELDS.map((f) => (
        <div key={f.name} className={f.half ? "" : "sm:col-span-2"}>
          <label
            htmlFor={f.name}
            className="block text-sm text-[var(--color-fg-muted)] mb-2"
          >
            {f.label}
            {f.required && "*"}
          </label>
          <input
            id={f.name}
            name={f.name}
            type={f.type}
            required={f.required}
            value={values[f.name]}
            onChange={update}
            className="w-full bg-transparent border-b border-[var(--color-border)] pb-2 outline-none focus:border-[var(--color-accent)] transition-colors"
          />
        </div>
      ))}

      <div className="sm:col-span-2">
        <label
          htmlFor="message"
          className="block text-sm text-[var(--color-fg-muted)] mb-2"
        >
          How can we help you?
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          value={values.message}
          onChange={update}
          className="w-full bg-transparent border-b border-[var(--color-border)] pb-2 outline-none focus:border-[var(--color-accent)] transition-colors resize-none"
        />
      </div>

      <div className="sm:col-span-2 flex items-center gap-6 mt-4">
        <button
          type="submit"
          disabled={status === "submitting"}
          className="group inline-flex items-center gap-3 bg-[var(--color-fg)] text-white rounded-full pl-8 pr-3 py-3 hover:opacity-90 transition-opacity disabled:opacity-60"
        >
          <span className="text-sm tracking-wide">
            {status === "submitting" ? "Sending…" : "Send via WhatsApp"}
          </span>
          <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-white text-[var(--color-fg)]">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path
                d="M3 13L13 3M13 3H5M13 3v8"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </button>
      </div>
    </form>
  );
}

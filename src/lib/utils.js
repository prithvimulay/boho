import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind class names, resolving conflicts.
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

/**
 * Your business WhatsApp number (international format, digits only).
 * All buildWhatsAppUrl() calls send here — change it in this one place.
 */
const BUSINESS_WHATSAPP_NUMBER = "918446321379";

/**
 * Build a WhatsApp deep link with a pre-filled message.
 * Always points to the business number above.
 */
export function buildWhatsAppUrl(message) {
  return `https://wa.me/${BUSINESS_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
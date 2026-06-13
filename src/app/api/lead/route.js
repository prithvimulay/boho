import { appendLead } from "@/src/services/googleSheets";

/**
 * POST /api/lead
 * Body: { name, email, phone, message }
 * Logs the lead to Google Sheets. The client handles WhatsApp redirect.
 */
export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const name = (body?.name ?? "").trim();
  const email = (body?.email ?? "").trim();
  const phone = (body?.phone ?? "").trim();
  const message = (body?.message ?? "").trim();

  if (!name || !email || !phone) {
    return Response.json(
      { error: "Name, email and phone are required." },
      { status: 400 }
    );
  }

  try {
    await appendLead({ name, email, phone, message });
  } catch (err) {
    // Don't block the user's WhatsApp redirect if logging fails —
    // surface a soft error the client can choose to ignore.
    console.error("Lead logging failed:", err);
    return Response.json(
      { ok: false, logged: false, error: "Could not log lead." },
      { status: 502 }
    );
  }

  return Response.json({ ok: true, logged: true });
}

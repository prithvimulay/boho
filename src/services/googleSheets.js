/**
 * Appends a lead row to a private Google Sheet.
 *
 * Uses a Google Service Account via the Sheets REST API.
 * Required environment variables (set in .env.local):
 *   GOOGLE_SHEETS_ID                – the target spreadsheet id
 *   GOOGLE_SERVICE_ACCOUNT_EMAIL    – service account email
 *   GOOGLE_PRIVATE_KEY              – service account private key (with \n escaped)
 *
 * Share the sheet with the service account email (Editor) so it can write.
 * This module is server-only — never import it into a client component.
 * (It relies on node:crypto and env vars, so it cannot run in the browser.)
 */

const SHEETS_SCOPE = "https://www.googleapis.com/auth/spreadsheets";
const TOKEN_URL = "https://oauth2.googleapis.com/token";

/** Base64url encode an object/string for a JWT segment. */
function base64url(input) {
  const json = typeof input === "string" ? input : JSON.stringify(input);
  return Buffer.from(json)
    .toString("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}

/** Build and sign a JWT, then exchange it for an access token. */
async function getAccessToken() {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const rawKey = process.env.GOOGLE_PRIVATE_KEY;
  if (!email || !rawKey) {
    throw new Error("Missing Google service account credentials");
  }
  const privateKey = rawKey.replace(/\\n/g, "\n");

  const now = Math.floor(Date.now() / 1000);
  const header = { alg: "RS256", typ: "JWT" };
  const claim = {
    iss: email,
    scope: SHEETS_SCOPE,
    aud: TOKEN_URL,
    exp: now + 3600,
    iat: now,
  };

  const unsigned = `${base64url(header)}.${base64url(claim)}`;

  const { createSign } = await import("node:crypto");
  const signer = createSign("RSA-SHA256");
  signer.update(unsigned);
  const signature = signer
    .sign(privateKey, "base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");

  const jwt = `${unsigned}.${signature}`;

  const res = await fetch(TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: jwt,
    }),
  });

  if (!res.ok) {
    throw new Error(`Token exchange failed: ${res.status}`);
  }
  const data = await res.json();
  return data.access_token;
}

/**
 * Append a single lead to the sheet.
 * @param {{name:string,email:string,phone:string,message:string}} lead
 */
export async function appendLead(lead) {
  const spreadsheetId = process.env.GOOGLE_SHEETS_ID;
  if (!spreadsheetId) throw new Error("Missing GOOGLE_SHEETS_ID");

  const accessToken = await getAccessToken();
  const timestamp = new Date().toISOString();
  const row = [timestamp, lead.name, lead.email, lead.phone, lead.message];

  const range = "Sheet1!A:E";
  const url =
    `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}` +
    `/values/${encodeURIComponent(range)}:append?valueInputOption=USER_ENTERED`;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ values: [row] }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Sheets append failed: ${res.status} ${text}`);
  }

  return true;
}

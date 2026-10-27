const publicBaseUrl = process.env.NEXT_PUBLIC_R2_PUBLIC_URL?.replace(/\/+$/, "");

if (!publicBaseUrl) {
  throw new Error("NEXT_PUBLIC_R2_PUBLIC_URL must be set to the public R2 base URL.");
}

export function assetUrl(path) {
  if (/^https?:\/\//i.test(path)) return path;
  return `${publicBaseUrl}/${path.replace(/^\/+/, "")}`;
}

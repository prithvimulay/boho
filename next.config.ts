import type { NextConfig } from "next";

const r2PublicUrl = process.env.NEXT_PUBLIC_R2_PUBLIC_URL;

if (!r2PublicUrl) {
  throw new Error("NEXT_PUBLIC_R2_PUBLIC_URL must be set to the public R2 base URL.");
}

const r2Url = new URL(r2PublicUrl);

if (r2Url.protocol !== "https:" || r2Url.username || r2Url.password) {
  throw new Error("NEXT_PUBLIC_R2_PUBLIC_URL must be an HTTPS URL without credentials.");
}

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: r2Url.hostname,
        pathname: `${r2Url.pathname.replace(/\/+$/, "")}/**`,
      },
    ],
  },
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Cloudflare static assets uchun: HTML/CSS/JS'ni `out/` papkasiga eksport qilamiz.
  // Sayt sof statik (server logikasi yo'q), shuning uchun to'liq mos keladi.
  output: "export",
};

export default nextConfig;

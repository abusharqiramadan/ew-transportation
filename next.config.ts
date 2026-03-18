import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  distDir: 'dist',
  images: {
    unoptimized: true, // Disable Next.js image optimization
  },
  /* config options here */
};

export default nextConfig;
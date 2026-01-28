import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: false,
  images: {
    domains: ["img.freepik.com", "images.unsplash.com","assets.aceternity.com", "localhost"]
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  
};

export default nextConfig;

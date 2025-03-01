import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  webpack: () => {},
  experimental: {
    turbo: {},
  },
};

export default nextConfig;

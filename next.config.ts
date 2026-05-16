import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "10003",
      },
      {
        protocol: "https",
        hostname: "cms.saapify.in",
      },
    ],
  },
};

export default nextConfig;

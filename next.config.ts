import type { NextConfig } from "next";
import { env } from "@/shared/config/env";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${env.API_URL}/:path*`,
      },
    ];
  },
};

export default nextConfig;

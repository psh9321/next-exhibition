import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental : {
    serverActions : {
      bodySizeLimit : "5mb"
    }
  },
  images : {
    remotePatterns : [
      {
        protocol : "https",
        hostname : "www.culture.go.kr",
        pathname: '/upload/**',
      },
      {
        protocol : "http",
        hostname : "localhost:2953",
        pathname: '/public/**',
      }
    ]
  }
};

export default nextConfig;

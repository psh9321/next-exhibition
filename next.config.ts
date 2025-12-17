import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: false,
  images : {
    remotePatterns : [
      {
        protocol : "http",
        hostname : "www.culture.go.kr",
        pathname: '/upload/**',
      }
    ]
  },
  compiler : {
    styledComponents : true
  }
};

export default nextConfig;

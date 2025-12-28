import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: false,
  productionBrowserSourceMaps : process["env"]["NODE_ENV"] === "production",
  images : {
    remotePatterns : [
      {
        protocol : "https",
        hostname : "www.culture.go.kr",
        pathname: '/upload/**',
      }
    ]
  },
  compiler : {
    styledComponents : true,
    removeConsole : process["env"]["NODE_ENV"] === "production",
  }
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https", // http or https
        hostname: "**", // domain of the remote images

        pathname: "/**", // allow all paths under /account123/
        // search: '',          // optional, leave empty unless you need query param filtering
      },
    ],
  },
};

export default nextConfig;

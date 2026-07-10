import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  sassOptions: {
    additionalData: `
      @use "@/styles/theme" as *;
      @use "@/styles/shadows" as *;
      @use "@/styles/responsive" as *;
      @use "@/styles/colors" as *;
      @use "@/styles/animations" as *;
    `,
  },
  reactCompiler: true,
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "fakestoreapi.com",
        pathname: "/img/**",
      },
      {
        protocol: "https",
        hostname: "**.googleusercontent.com",
      },
    ],
  },
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  sassOptions: {
    additionalData: `
      @use "@/styles/responsive" as *;
      @use "@/styles/colors" as *;
    `,
  },
};

export default nextConfig;

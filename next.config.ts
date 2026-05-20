import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  sassOptions: {
    additionalData: `
      @use "@/styles/theme" as *;
      @use "@/styles/shadows" as *;
      @use "@/styles/responsive" as *;
      @use "@/styles/colors" as *;


    `,
  },
  reactCompiler: true,
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // This is the crucial line that enables static site generation
  output: 'export',

  // This line is needed to disable image optimization, which isn't
  // supported in a static export environment.
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
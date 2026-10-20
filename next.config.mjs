const repo = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig = {
  output: "export",
  basePath: repo,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;

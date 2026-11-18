import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Старое написание названия товара (до переименования в BURGENZIPPER)
      {
        source: "/catalog/burgziper",
        destination: "/catalog/burgenzipper",
        permanent: true,
      },
      {
        source: "/burgziper-front.jpg",
        destination: "/burgenzipper-front.jpg",
        permanent: true,
      },
      {
        source: "/burgziper-back.jpg",
        destination: "/burgenzipper-back.jpg",
        permanent: true,
      },
      {
        source: "/burgziper-open.jpg",
        destination: "/burgenzipper-open.jpg",
        permanent: true,
      },
      {
        source: "/burgziper-detail.jpg",
        destination: "/burgenzipper-detail.jpg",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

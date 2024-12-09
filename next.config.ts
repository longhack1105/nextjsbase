import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  swcMinify: false,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  i18n: {
    locales: ['vi', 'en', 'zh-CN'],
    defaultLocale: 'vi',
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: `${process.env.NEXT_PUBLIC_API_BASE_1}/:path*`,
        destination: `${process.env.NEXT_PUBLIC_API_1}/:path*`,
      },
      // {
      //   source: `${process.env.NEXT_PUBLIC_API_CHAT}/:path*`,
      //   destination: `${process.env.NEXT_PUBLIC_SOCKET}/:path*`,
      // },
      // {
      //   source: `${process.env.NEXT_PUBLIC_BASE_MEDIA}/:path*`,
      //   destination: `${process.env.NEXT_PUBLIC_API_MEDIA}/:path*`,
      // },
    ];
  },
};

export default nextConfig;

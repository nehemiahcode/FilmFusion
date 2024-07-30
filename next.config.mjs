import { hostname } from "os";

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "image.tmdb.org",
      },
    ],
  },
};

export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_BACKEND_API_URL: process.env.NEXT_PUBLIC_BACKEND_API_URL,
  },
  images: {
    domains: ['localhost','api.apnaopd.com'],
  },
};

export default nextConfig;

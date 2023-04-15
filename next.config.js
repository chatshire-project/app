/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  publicRuntimeConfig: {
    AMPLITUDE_KEY: process.env.AMPLITUDE_KEY,
  },
};

module.exports = nextConfig;

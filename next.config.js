/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      process.env.WORDPRESS_API_URL.match(/(?!(w+)\.)\w*(?:\w+\.)+\w+/)[0],
      "0.gravatar.com",
      "1.gravatar.com",
      "2.gravatar.com",
      "secure.gravatar.com",
    ],
  },
};

module.exports = nextConfig;

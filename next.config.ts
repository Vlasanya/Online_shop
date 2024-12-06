/* eslint-disable @typescript-eslint/no-var-requires */
const withTM = require('next-transpile-modules')([
  '@ant-design/icons',
  'rc-util',
]);

/** @type {import('next').NextConfig} */
const nextConfig = withTM({
  reactStrictMode: true,
  images: {
    domains: ['fakestoreapi.com'],
  },
});

module.exports = nextConfig;

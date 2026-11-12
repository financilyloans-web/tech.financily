/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // NOTE: this sandbox's Application Control policy blocks Next's native SWC
  // binary (@next/swc-*.node), so compilation runs through Babel via
  // babel.config.js. (swcMinify is removed in Next 15; minification falls
  // back to Terser when Babel is active.)
};

export default nextConfig;

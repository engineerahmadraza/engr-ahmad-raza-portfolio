/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['fiverr-res.cloudinary.com', 'cdn.upwork.com', 'media.licdn.com'],
    remotePatterns: [
      { protocol: 'https', hostname: '**' }
    ]
  },
  webpack: (config) => {
    config.externals = config.externals || [];
    return config;
  }
};

export default nextConfig;

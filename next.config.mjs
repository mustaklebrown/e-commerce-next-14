/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        // domains: ["plus.unsplash.com", "images.unsplash.com", "utfs.io"],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'plus.unsplash.com',
            },
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
            },
            {
                protocol: 'https',
                hostname: 'utfs.io',
            },
        ],
    },


};

export default nextConfig;

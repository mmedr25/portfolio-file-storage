/** @type {import('next').NextConfig} */

const imageConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "**"
            }
        ]
    }
}

const nextConfig = {
    ...imageConfig
};

export default nextConfig;

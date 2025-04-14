/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "dl.ghorbany.dev",
                port: "",
                pathname: "/**"
            }
        ]
    }
};

export default nextConfig;

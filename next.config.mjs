/** @type {import('next').NextConfig} */
const nextConfig = {
    // Disable ESLint during build
    eslint: {
        ignoreDuringBuilds: true,
    },
    
    // Disable type checking during build
    typescript: {
        ignoreBuildErrors: true,
    },
    
    // Configure external packages for server components
    experimental: {
        serverComponentsExternalPackages: ['mongoose', 'bcryptjs'],
    },
};

export default nextConfig;
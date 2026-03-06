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
    
    // ✅ FIXED: Use serverExternalPackages instead of serverComponentsExternalPackages
    serverExternalPackages: ['mongoose', 'bcryptjs'],
};

export default nextConfig;
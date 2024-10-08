/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['avatars.githubusercontent.com','lh3.googleusercontent.com','krishna-twitter-dev.s3.ap-south-1.amazonaws.com'],
    },
    async headers() {
        return [
          {
            // matching all API routes
            source: '/api/:path*',
            headers: [
              { key: 'Access-Control-Allow-Credentials', value: 'true' },
              { key: 'Access-Control-Allow-Origin', value: 'http://localhost:8000' }, // or specific domain instead of '*'
              { key: 'Access-Control-Allow-Methods', value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT' },
              { key: 'Access-Control-Allow-Headers', value: 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version' },
            ],
          },
        ];
    },
};

export default nextConfig;

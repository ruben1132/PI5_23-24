/** @type {import('next').NextConfig} */

const nextConfig = {
    // Other Next.js configuration...
  
    server: {
      // Override the default Next.js server
      // Use HTTP server instead of HTTPS
      http: {
        // Force HTTP in production
        force: true,
      },
    },
  };

module.exports = nextConfig;

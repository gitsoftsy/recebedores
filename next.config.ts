import type { NextConfig } from 'next';
 
const nextConfig: NextConfig = {
  trailingSlash: true, // Garante que todas as rotas terminem com '/'
  output: 'standalone', // Para facilitar o deploy se necessário
  async rewrites() {
    return [
      {
        source: '',
        destination: '/pages/*'
      },
     
    ];
  },
};
 
export default nextConfig;
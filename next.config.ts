import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  trailingSlash: true, // Garante que todas as rotas terminem com '/'
  output: 'standalone', // Para facilitar o deploy se necessário
  async rewrites() {
    return [
      {
        source: '/:path*', // Captura todas as rotas que começam com /pages
        destination: '/pages/:path*',  // Redireciona para a mesma rota sem /pages
      },
    ];
  },
};

export default nextConfig;
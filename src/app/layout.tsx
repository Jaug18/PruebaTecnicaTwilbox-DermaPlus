'use client';

import React from 'react';
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import { usePathname } from 'next/navigation';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { AuthProvider } from '../context/AuthContext';
import theme from '../theme';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  
  // Páginas donde no mostrar header/footer público
  const isAuthPage = pathname === '/login';
  const isDashboardPage = pathname?.startsWith('/dashboard');
  const showPublicLayout = !isAuthPage && !isDashboardPage;

  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <title>DermaPlus - Clínica Estética | Tratamientos Faciales y Corporales</title>
        <meta name="description" content="DermaPlus es tu clínica de confianza para tratamientos estéticos y dermatológicos. Tecnología avanzada, profesionales certificados y resultados garantizados." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#319795" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@500;600;700&display=swap" rel="stylesheet" />
        
        {/* Open Graph */}
        <meta property="og:title" content="DermaPlus - Clínica Estética" />
        <meta property="og:description" content="Tratamientos faciales, corporales y dermatológicos con tecnología de vanguardia." />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="es_MX" />
      </head>
      <body>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <ChakraProvider theme={theme}>
          <AuthProvider>
            {showPublicLayout && <Header />}
            <main style={{ minHeight: '100vh' }}>{children}</main>
            {showPublicLayout && <Footer />}
          </AuthProvider>
        </ChakraProvider>
      </body>
    </html>
  );
}
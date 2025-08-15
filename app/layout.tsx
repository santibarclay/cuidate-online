import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { SITE_NAME, SITE_DESCRIPTION, SITE_URL } from '@/lib/constants';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: `${SITE_NAME} - Aprendé seguridad digital jugando`,
  description: SITE_DESCRIPTION,
  keywords: ['seguridad digital', 'ciberseguridad', 'educación', 'Argentina', 'password manager', '2FA', 'phishing'],
  authors: [{ name: 'Santiago Barclay' }],
  creator: 'Santiago Barclay',
  openGraph: {
    type: 'website',
    locale: 'es_AR',
    url: SITE_URL,
    title: `${SITE_NAME} - Aprendé seguridad digital jugando`,
    description: SITE_DESCRIPTION,
    siteName: SITE_NAME,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es-AR">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
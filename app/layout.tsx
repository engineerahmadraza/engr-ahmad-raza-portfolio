import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';
import { Toaster } from 'sonner';

export const metadata: Metadata = {
  title: 'Engineer Ahmad Raza | Mechatronics Engineer & Automation Specialist',
  description:
    'Portfolio of Ahmad Raza — Mechatronics Engineer specializing in Industrial Automation, Embedded Systems, AI/ML, Robotics, and Beverage Line Engineering (KHS, Krones, Tetra Pak). Available for freelance & full-time opportunities.',
  keywords: [
    'Mechatronics Engineer',
    'Industrial Automation',
    'PLC HMI',
    'Embedded Systems',
    'Arduino',
    'MATLAB',
    'SolidWorks',
    'AI ML',
    'Pakistan Engineer',
    'Freelance Engineer',
  ],
  authors: [{ name: 'Ahmad Raza', url: 'https://www.linkedin.com/in/engineerahmadraza' }],
  openGraph: {
    title: 'Engineer Ahmad Raza | Mechatronics Engineer',
    description: 'Beverage Lines • Industrial Automation • Embedded Systems • AI/ML',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Rajdhani:wght@300;400;500;600;700&family=Barlow:wght@300;400;500;600;700&family=JetBrains+Mono:wght@300;400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="noise-overlay">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          {children}
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                background: '#111120',
                border: '1px solid rgba(198,40,40,0.3)',
                color: '#f0f0f0',
              },
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}

import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Founder Mode Coffee',
  description: 'Discover your custom coffee roast',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
} 
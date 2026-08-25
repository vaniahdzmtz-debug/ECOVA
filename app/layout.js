import { Fraunces, Inter } from 'next/font/google';
import './globals.css';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  weight: ['400', '500', '600'],
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['400', '500', '600'],
});

export const metadata = {
  title: 'Ecova — Sustainability guidance for everyday choices',
  description:
    'Ecova helps university students make more informed, sustainable everyday choices.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable}`}>
      <body className="font-body antialiased">
        <NavBar />
        {children}
        <Footer />
      </body>
    </html>
  );
}

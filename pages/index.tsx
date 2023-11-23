import { Inter } from 'next/font/google';
import ServerComponent from '@/components/ServerComponent';
import LocalComponent from '@/components/LocalComponent';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <>
      <ServerComponent />
      <LocalComponent />
    </>
  );
}

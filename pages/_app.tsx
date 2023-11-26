/* eslint-disable react-hooks/exhaustive-deps */
import ErrorBoundary from '@/Components/ErrorBoundary/ErrorBoundary';
import Spinner from '@/Elements/Spinner/Spinner';
import '@/styles/globals.css';
import '@/styles/roundBtn.css';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    router.events.on('routeChangeStart', () => {
      setIsLoading(true);
    });
    router.events.on('routeChangeComplete', () => {
      setIsLoading(false);
    });
  }, []);
  return (
    <ErrorBoundary>
      <Component {...pageProps} />
      {isLoading ? <Spinner /> : <></>}
    </ErrorBoundary>
  );
}

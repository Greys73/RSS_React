import ErrorBoundary from '@/Components/ErrorBoundary/ErrorBoundary';
import '@/styles/globals.css';
import '@/styles/roundBtn.css';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ErrorBoundary>
      <Component {...pageProps} />
    </ErrorBoundary>
  );
}

import ErrorBoundary from '@/Components/ErrorBoundary/ErrorBoundary';
import { setupStore } from '@/store/store';
import '@/styles/globals.css';
import '@/styles/roundBtn.css';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ErrorBoundary>
      <Provider store={setupStore()}>
        <Component {...pageProps} />
      </Provider>
    </ErrorBoundary>
  );
}

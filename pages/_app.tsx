import IsLogin from '@/components/is-login';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { SWRConfig } from 'swr';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig
      value={{
        fetcher: (url: string) =>
          fetch(url).then((response) => response.json()),
      }}
    >
      <div className='mx-auto w-full max-w-xl'>
        <IsLogin />
        <Component {...pageProps} />
      </div>
    </SWRConfig>
  );
}

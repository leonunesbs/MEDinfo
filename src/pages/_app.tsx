import * as gtag from '@/libs/gtag';

import { Analytics, Fonts } from '@/components/atoms';

import type { AppProps } from 'next/app';
import { ChakraBaseProvider } from '@chakra-ui/react';
import { SessionProvider } from 'next-auth/react';
import theme from '@/styles/theme';
import { trpc } from '@/utils/trpc';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      gtag.pageview(url);
    };
    if (process.env.NODE_ENV === 'production') {
      router.events.on('routeChangeComplete', handleRouteChange);
      return () => {
        router.events.off('routeChangeComplete', handleRouteChange);
      };
    }
  }, [router.events]);

  return (
    <SessionProvider session={session}>
      <ChakraBaseProvider theme={theme}>
        <Component {...pageProps} />
        <Fonts />
      </ChakraBaseProvider>
      <Analytics />
    </SessionProvider>
  );
}

export default trpc.withTRPC(MyApp);

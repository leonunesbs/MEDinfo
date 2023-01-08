import type { AppProps } from 'next/app';
import { ChakraBaseProvider } from '@chakra-ui/react';
import { Fonts } from '@/components/atoms';
import { SessionProvider } from 'next-auth/react';
import theme from '@/styles/theme';
import { trpc } from '@/utils/trpc';

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <ChakraBaseProvider theme={theme}>
        <Component {...pageProps} />
        <Fonts />
      </ChakraBaseProvider>
    </SessionProvider>
  );
}

export default trpc.withTRPC(MyApp);

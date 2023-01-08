import type { AppProps } from 'next/app';
import { ChakraBaseProvider } from '@chakra-ui/react';
import { Fonts } from '@/components/atoms';
import theme from '@/styles/theme';
import { trpc } from '@/utils/trpc';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraBaseProvider theme={theme}>
      <Component {...pageProps} />
      <Fonts />
    </ChakraBaseProvider>
  );
}

export default trpc.withTRPC(MyApp);

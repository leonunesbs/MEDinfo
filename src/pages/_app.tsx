import type { AppProps } from 'next/app';
import { ChakraBaseProvider } from '@chakra-ui/react';
import { Fonts } from '@/components/atoms';
import Script from 'next/script';
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
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){window.dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', ${process.env.GA_MEASUREMENT_ID});
          `}
      </Script>
    </SessionProvider>
  );
}

export default trpc.withTRPC(MyApp);

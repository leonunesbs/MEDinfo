import { Container, Flex, FlexProps } from '@chakra-ui/react';
import { Footer, Navbar } from '../organisms';

import Head from 'next/head';
import { ReactNode } from 'react';
import { useRouter } from 'next/router';

interface LayoutProps {
  children: ReactNode;
  title: string;
  description: string;
  keywords: string;
  image: string;
  mainProps?: FlexProps;
}

export function Layout({
  children,
  mainProps,
  title,
  description,
  keywords,
  image,
}: LayoutProps) {
  const router = useRouter();
  const maxW = '6xl';
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>{`${title} » MEDinfo Brasil`}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <meta name="description" content={description} />
        <meta name="keywords" content={`${keywords}`} />
        <link
          rel="canonical"
          href={`https://medinfobrasil.vercel.app${router.asPath}`}
        />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content={`https://medinfobrasil.vercel.app${router.asPath}`}
        />
        <meta property="og:title" content={`${title} » MEDinfo Brasil`} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={image} />
        <meta property="og:image:alt" content={title} />
        <meta property="og:locale" content="pt_BR" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:url"
          content={`https://medinfobrasil.vercel.app${router.asPath}`}
        />
        <meta property="twitter:title" content={`${title} » MEDinfo Brasil`} />
        <meta property="twitter:description" content={description} />
        <meta property="twitter:image" content={image} />
        <meta name="twitter:image:alt" content={title} />
      </Head>
      <Flex direction="column" flex="1">
        <Navbar containerProps={{ maxW: 'full' }} />
        <Flex
          as="main"
          role="main"
          direction="column"
          flex="1"
          py="16"
          {...mainProps}
        >
          <Container flex="1" maxW={maxW} minH="50vh">
            {children}
          </Container>
        </Flex>
        <Footer containerProps={{ maxW: 'full' }} />
      </Flex>
    </>
  );
}

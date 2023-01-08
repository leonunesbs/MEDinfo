import {
  AspectRatio,
  Box,
  Button,
  Divider,
  Heading,
  HeadingProps,
  HStack,
  Stack,
  Text,
  TextProps,
} from '@chakra-ui/react';
import { GetStaticPaths, GetStaticProps } from 'next';

import { Layout } from '@/components/templates';
import { prisma } from '@/server/prisma';
import { Post } from '@prisma/client';
import ChakraUIRenderer from 'chakra-ui-markdown-renderer';
import NextImage from 'next/image';
import NextLink from 'next/link';
import { HiOutlineExternalLink } from 'react-icons/hi';
import { MdModeEditOutline } from 'react-icons/md';
import ReactMarkdown from 'react-markdown';

const newTheme = {
  p: (props: TextProps) => {
    const { children } = props;
    return (
      <Text textAlign={'justify'} mb={4} fontSize={'xl'}>
        {children}
      </Text>
    );
  },
  h2: (props: HeadingProps) => {
    const { children } = props;
    return (
      <Heading as="h2" size={'md'} mb={2}>
        {children}
      </Heading>
    );
  },
};

function Post({ post }: { post: Post }) {
  return (
    <Layout {...post}>
      <Stack direction={['column', 'row']} spacing={6}>
        <Stack spacing={6}>
          <Heading as="h1" fontWeight={'black'}>
            {post.title}
          </Heading>
          <Divider display={['none', 'flex']} />
          <Stack>
            <Text fontSize={'sm'} fontWeight="normal">
              Fonte: {post.source}
            </Text>
            <HStack>
              <Box>
                <Button
                  as={NextLink}
                  href={post.sourceUrl}
                  rightIcon={<HiOutlineExternalLink />}
                >
                  Acessar referência
                </Button>
              </Box>
              <Box>
                <Button
                  variant={'outline'}
                  as={NextLink}
                  href={`/${post.slug}/edit`}
                  rightIcon={<MdModeEditOutline />}
                >
                  Editar
                </Button>
              </Box>
            </HStack>
          </Stack>
        </Stack>
        <Divider display={['flex', 'none']} />
        <Stack w="full">
          <AspectRatio ratio={1} position={'relative'}>
            <NextImage
              priority
              draggable={false}
              src={post.image}
              alt={post.title}
              fill
              style={{
                position: 'absolute',
                objectFit: 'cover',
              }}
            />
          </AspectRatio>
        </Stack>
      </Stack>
      <Divider my={6} />
      <Box>
        <ReactMarkdown components={ChakraUIRenderer(newTheme)} skipHtml>
          {post.content}
        </ReactMarkdown>
      </Box>
      <Divider mb={6} />
      <Stack>
        <HStack w="full " justify={'space-between'}>
          <Text fontSize={'sm'} fontWeight="normal">
            Fonte: {post.source}
          </Text>
          <Text fontSize={'sm'} fontStyle="italic">
            {new Date(post.createdAt).toLocaleDateString('pt-BR')}
          </Text>
        </HStack>
        <HStack>
          <Box>
            <Button as={NextLink} href="/" variant={'outline'}>
              Voltar
            </Button>
          </Box>
          <Box>
            <Button
              as={NextLink}
              href={post.sourceUrl}
              rightIcon={<HiOutlineExternalLink />}
            >
              Acessar referência
            </Button>
          </Box>
        </HStack>
      </Stack>
    </Layout>
  );
}
export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await prisma.post.findMany({
    select: {
      slug: true,
    },
  });

  const paths = posts.map((post) => ({
    params: {
      slug: post.slug,
    },
  }));

  return {
    paths,
    fallback: 'blocking',
  };
};
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;
  const post = await prisma.post.findUnique({
    where: {
      slug,
    },
  });

  if (!post) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      post: JSON.parse(JSON.stringify(post)),
    },
  };
};

export default Post;

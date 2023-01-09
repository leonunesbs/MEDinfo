import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
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
  useDisclosure,
} from '@chakra-ui/react';
import { GetStaticPaths, GetStaticProps } from 'next';

import { Layout } from '@/components/templates';
import { prisma } from '@/server/prisma';
import { trpc } from '@/utils/trpc';
import { Post } from '@prisma/client';
import ChakraUIRenderer from 'chakra-ui-markdown-renderer';
import { useSession } from 'next-auth/react';
import NextImage from 'next/image';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useRef } from 'react';
import { HiOutlineExternalLink } from 'react-icons/hi';
import { MdDelete, MdModeEditOutline } from 'react-icons/md';
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
  const { data } = useSession();
  const router = useRouter();

  const cancelRef = useRef<HTMLButtonElement>(null);
  const deleteAlert = useDisclosure();
  const deletePost = trpc.posts.delete.useMutation({
    onSuccess: () => {
      router.push('/');
    },
  });
  const handleDelete = async () => {
    await deletePost.mutateAsync({ id: post.id });
  };

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
                  colorScheme="blue"
                  rightIcon={<HiOutlineExternalLink />}
                >
                  Acessar referência
                </Button>
              </Box>
            </HStack>
            {data?.user.isStaff && (
              <HStack>
                <Box>
                  <Button
                    as={NextLink}
                    href={`/posts/${post.slug}/edit`}
                    rightIcon={<MdModeEditOutline />}
                  >
                    Editar
                  </Button>
                </Box>
                <Box>
                  <Button
                    colorScheme="red"
                    rightIcon={<MdDelete />}
                    onClick={deleteAlert.onOpen}
                    isLoading={deletePost.isLoading}
                  >
                    Excluir
                  </Button>
                  <AlertDialog leastDestructiveRef={cancelRef} {...deleteAlert}>
                    <AlertDialogOverlay>
                      <AlertDialogContent>
                        <AlertDialogHeader fontSize="lg" fontWeight="bold">
                          Excluir post
                        </AlertDialogHeader>

                        <AlertDialogBody>
                          Tem certeza que deseja excluir este post?
                        </AlertDialogBody>

                        <AlertDialogFooter>
                          <Button ref={cancelRef} onClick={deleteAlert.onClose}>
                            Cancelar
                          </Button>
                          <Button
                            colorScheme="red"
                            onClick={handleDelete}
                            isLoading={deletePost.isLoading}
                            ml={3}
                          >
                            Excluir
                          </Button>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialogOverlay>
                  </AlertDialog>
                </Box>
              </HStack>
            )}
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
              Início
            </Button>
          </Box>
          <Box>
            <Button
              as={NextLink}
              href={post.sourceUrl}
              colorScheme="blue"
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
    revalidate: 60,
  };
};

export default Post;

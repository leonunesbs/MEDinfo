import {
  AspectRatio,
  Box,
  Button,
  HStack,
  Input,
  SimpleGrid,
  Stack,
  Text,
} from '@chakra-ui/react';

import { GetStaticProps } from 'next';
import { Layout } from '@/components/templates';
import NextImage from 'next/image';
import NextLink from 'next/link';
import { Post } from '@prisma/client';
import { prisma } from '@/server/prisma';

const PostCard = ({ post }: { post: Post }) => {
  return (
    <Box
      w="full"
      shadow="md"
      rounded="lg"
      overflow="hidden"
      _hover={{ shadow: 'lg' }}
    >
      <AspectRatio ratio={1}>
        <NextImage
          sizes="50vw"
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
      <Box p={4}>
        <Text
          fontSize="xl"
          fontWeight="bold"
          color="gray.900"
          noOfLines={3}
          mb={2}
        >
          {post.title}
        </Text>
        <Text fontSize="sm" color="gray.500" noOfLines={3}>
          {post.description}
        </Text>
      </Box>
      <Box p={4}>
        <HStack justify="space-between">
          <Text fontSize="sm" color="gray.500">
            {new Date(post.createdAt).toLocaleString('pt-BR', {
              dateStyle: 'short',
              timeStyle: 'short',
            })}
          </Text>
          <Button
            as={NextLink}
            href={`/posts/${post.slug}`}
            size="sm"
            variant="outline"
          >
            Ler mais
          </Button>
        </HStack>
      </Box>
    </Box>
  );
};

export default function Home({ posts }: { posts: Post[] }) {
  return (
    <Layout
      title="MEDinfo"
      description="Informação com referência"
      image="/images/medinfo.png"
      keywords="atualização, medicina, saúde, referência,"
    >
      <Stack spacing={4}>
        <HStack w="full" justify="space-between">
          <Text fontSize="2xl" fontWeight="bold">
            Posts
          </Text>
        </HStack>
        <HStack maxW="md">
          <Input placeholder="Buscar uma postagem" />
          <Button>Buscar</Button>
        </HStack>
        <SimpleGrid gap={4} columns={[1, 2, 3]}>
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </SimpleGrid>
      </Stack>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const posts = await prisma.post.findMany({
    take: 3,
    orderBy: {
      createdAt: 'desc',
    },
  });

  return {
    props: {
      posts: JSON.parse(JSON.stringify(posts)),
    },
  };
};

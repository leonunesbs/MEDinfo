import {
  AspectRatio,
  Button,
  Card,
  CardBody,
  CardFooter,
  HStack,
  Heading,
  IconButton,
  Input,
  SimpleGrid,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { FaArrowRight, FaSearch } from 'react-icons/fa';

import { GetStaticProps } from 'next';
import { Layout } from '@/components/templates';
import NextImage from 'next/image';
import NextLink from 'next/link';
import { Post } from '@prisma/client';
import { prisma } from '@/server/prisma';

const PostCard = ({ post }: { post: Post }) => {
  return (
    <Card
      w="full"
      overflow="hidden"
      _hover={{ shadow: 'lg' }}
      variant="elevated"
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
      <CardBody>
        <Heading
          as="h2"
          size="md"
          color={useColorModeValue('gray.800', 'white')}
          mb={2}
        >
          {post.title}
        </Heading>
        <Text
          fontSize="sm"
          color={useColorModeValue('gray.500', 'gray.400')}
          textAlign="justify"
        >
          {post.description}
        </Text>
      </CardBody>
      <CardFooter>
        <HStack justify="space-between" w="full">
          <Text fontSize="sm" color={useColorModeValue('gray.500', 'gray.400')}>
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
            rightIcon={<FaArrowRight />}
          >
            Ler mais
          </Button>
        </HStack>
      </CardFooter>
    </Card>
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
          <IconButton aria-label="Buscar" icon={<FaSearch />} />
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

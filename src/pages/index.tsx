import {
  AspectRatio,
  Box,
  Button,
  ButtonGroup,
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
import { FaArrowLeft, FaArrowRight, FaSearch } from 'react-icons/fa';
import { useCallback, useState } from 'react';

import { GetStaticProps } from 'next';
import { Layout } from '@/components/templates';
import NextImage from 'next/image';
import NextLink from 'next/link';
import { Post } from '@prisma/client';
import { paginate } from '@/libs/functions';
import { prisma } from '@/server/prisma';
import { useRouter } from 'next/router';

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
          priority
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
          noOfLines={4}
        >
          {post.title}
        </Heading>
        <Text
          fontSize="sm"
          color={useColorModeValue('gray.500', 'gray.400')}
          textAlign="justify"
          noOfLines={6}
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
  const router = useRouter();
  const [q, setQ] = useState('');
  const [showAll, setShowAll] = useState(false);

  const pageSize = 9;
  const pageNumber = router.query.page ? Number(router.query.page) : 1;

  const {
    page,
    hasNext,
    hasPrev,
    object: paginatedPosts,
  } = paginate(posts, pageSize, pageNumber);

  const handleNext = () => {
    router.replace({
      pathname: '/',
      query: {
        page: page + 1,
      },
    });
  };

  const handlePrev = () => {
    router.replace({
      pathname: '/',
      query: {
        page: page - 1,
      },
    });
  };

  const getPosts = useCallback(() => {
    if (q) {
      return posts.filter((post) => {
        const title = post.title.toLowerCase();
        const description = post.description.toLowerCase();
        const content = post.content.toLowerCase();
        const source = post.source.toLowerCase();
        const keywords = post.keywords.toLowerCase();

        const qLower = q.toLowerCase();
        return (
          title.includes(qLower) ||
          description.includes(qLower) ||
          content.includes(qLower) ||
          source.includes(qLower) ||
          keywords.includes(qLower)
        );
      });
    }

    if (showAll) {
      return posts;
    }

    return paginatedPosts;
  }, [paginatedPosts, posts, q, showAll]);

  return (
    <Layout
      title="Informação com referência MEDinfo Brasil"
      description="Informação com referência, MEDinfo Brasil. Atualização em medicina e saúde."
      image="/medinfo.png"
      keywords="atualização, informação, medicina, saúde, referência,"
    >
      <Stack spacing={4}>
        <HStack w="full" justify="space-between">
          <Heading as="h1" size="lg">
            Posts
          </Heading>
        </HStack>
        <HStack maxW="md">
          <Input
            placeholder="Buscar uma postagem"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
          <IconButton aria-label="Buscar" icon={<FaSearch />} />
        </HStack>
        <SimpleGrid gap={4} columns={[1, 2, 3]}>
          {getPosts().map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </SimpleGrid>
        <Stack align={'center'} spacing={4}>
          <ButtonGroup justifyContent={'center'}>
            <Button
              disabled={!hasPrev}
              onClick={handlePrev}
              leftIcon={<FaArrowLeft />}
            >
              Anterior
            </Button>
            <IconButton
              variant={'unstyled'}
              cursor="auto"
              borderWidth={1}
              aria-label={`Página ${1}`}
              icon={<Text>{page}</Text>}
            />
            <Button
              disabled={!hasNext}
              onClick={handleNext}
              rightIcon={<FaArrowRight />}
            >
              Próxima
            </Button>
          </ButtonGroup>
          <Box>
            <Button variant={'link'} onClick={() => setShowAll(true)}>
              Ver tudo
            </Button>
          </Box>
        </Stack>
      </Stack>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const posts = await prisma.post.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    take: 100,
  });
  prisma.$disconnect();

  return {
    props: {
      posts: JSON.parse(JSON.stringify(posts)),
    },
    revalidate: 10,
  };
};

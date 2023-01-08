import {
  Box,
  Button,
  HStack,
  Heading,
  Input,
  Stack,
  Textarea,
} from '@chakra-ui/react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { GetServerSideProps } from 'next';
import { Layout } from '@/components/templates';
import { Post } from '@prisma/client';
import { prisma } from '@/server/prisma';
import { trpc } from '@/utils/trpc';
import { useRouter } from 'next/router';

type Inputs = Post;

function Edit({ post }: { post: Post }) {
  const { handleSubmit, register } = useForm<Inputs>({
    defaultValues: {
      title: post.title,
      description: post.description,
      keywords: post.keywords,
      content: post.content,
      source: post.source,
      sourceUrl: post.sourceUrl,
    },
  });
  const router = useRouter();
  const updatePost = trpc.posts.update.useMutation();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    updatePost.mutate({
      ...data,
      id: post.id,
    });
    router.push(`/posts/${post.slug}`);
  };
  return (
    <Layout
      title="Editar publicação"
      description="Editar uma publicação no blog"
      keywords="blog, posts, edit"
      image=""
    >
      <Heading as="h1" mb={4}>
        Editar publicação
      </Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={4}>
          <Input type="text" placeholder="Título" {...register('title')} />
          <Input
            type="text"
            placeholder="Descrição"
            {...register('description')}
          />

          <Input
            type="text"
            placeholder="Palavras-chave"
            {...register('keywords')}
          />
          <Textarea placeholder="Conteúdo" {...register('content')} />
          <HStack>
            <Input type="text" placeholder="Fonte" {...register('source')} />
            <Input type="text" placeholder="Link" {...register('sourceUrl')} />
          </HStack>
          <Box>
            <Button type="submit">Atualizar</Button>
          </Box>
        </Stack>
      </form>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const post = await prisma.post.findUniqueOrThrow({
    where: {
      slug: ctx.params?.slug as string,
    },
  });
  return {
    props: {
      post: JSON.parse(JSON.stringify(post)),
    },
  };
};

export default Edit;

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

import { Layout } from '@/components/templates';
import { Post } from '@prisma/client';
import axios from 'axios';
import { trpc } from '@/utils/trpc';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

type Inputs = Omit<Post, 'image'> & {
  image: FileList;
};

function Add() {
  const { handleSubmit, register } = useForm<Inputs>();
  const router = useRouter();
  const addPost = trpc.posts.create.useMutation();
  const { data: session } = useSession();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const image = {
      name: data.image[0].name,
      type: data.image[0].type,
      size: data.image[0].size,
    };
    await addPost
      .mutateAsync({
        ...data,
        authorEmail: session?.user?.email as string,
        image,
      })
      .then(async (post) => {
        await axios.put(post.uploadUrl, data.image[0], {
          headers: {
            'Content-Type': image.type,
            'Access-Control-Allow-Origin': '*',
            'Content-Disposition': 'inline',
          },
        });
        router.push(`/posts/${post.slug}`);
      });
  };
  return (
    <Layout
      title="Nova publicação"
      description="Adicione uma nova publicação ao blog"
      keywords="blog, posts, add"
      image="https://i.imgur.com/1Z5wqQ0.png"
    >
      <Heading as="h1" mb={4}>
        Nova publicação
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
          <Textarea
            minH={'md'}
            placeholder="Conteúdo"
            {...register('content')}
          />
          <HStack>
            <Input type="text" placeholder="Fonte" {...register('source')} />
            <Input type="text" placeholder="Link" {...register('sourceUrl')} />
          </HStack>
          <Input type="file" pt={1} {...register('image')} />
          <Box>
            <Button type="submit" isLoading={addPost.isLoading}>
              Salvar
            </Button>
          </Box>
        </Stack>
      </form>
    </Layout>
  );
}

export default Add;

import { router, staffProcedure } from '../trpc';

import S3 from 'aws-sdk/clients/s3';
import { prisma } from '../prisma';
import { slugify } from '@/libs/functions';
import { z } from 'zod';

const s3_init = new S3({
  region: 'sa-east-1',
  accessKeyId: process.env.S3_ACCESS_KEY,
  secretAccessKey: process.env.S3_SECRET_KEY,
  signatureVersion: 'v4',
});

function generateImageName(fileName: string): string {
  const extension = fileName.split('.').pop();
  return `${Date.now()}.${extension}`;
}

export const posts = router({
  create: staffProcedure
    .input(
      z.object({
        authorEmail: z.string(),
        title: z.string(),
        description: z.string(),
        keywords: z.string(),
        content: z.string(),
        image: z.object({
          name: z.string(),
          type: z.string(),
          size: z.number(),
        }),
        source: z.string(),
        sourceUrl: z.string(),
      }),
    )
    .mutation(async ({ input: { authorEmail, ...input } }) => {
      const fileParams = {
        Bucket: process.env.S3_BUCKET,
        Key: `${generateImageName(input.image.name)}`,
        Expires: 10 * 60, // 10 minutes
        ContentType: input.image.type,
        ContentDisposition: 'inline',
        ACL: 'public-read',
      };

      const url = await s3_init.getSignedUrlPromise('putObject', fileParams);

      const slug = slugify(input.title);
      async function validatedSlug(slug: string) {
        const post = await prisma.post.findFirst({
          where: {
            slug,
          },
        });
        if (post) {
          return `${slug}-${Date.now()}`;
        } else {
          return slug;
        }
      }

      const post = await prisma.post.create({
        data: {
          ...input,
          author: {
            connect: {
              email: authorEmail,
            },
          },
          image: url.split('?')[0],
          slug: await validatedSlug(slug),
        },
      });

      return {
        ...post,
        uploadUrl: url,
      };
    }),
  update: staffProcedure
    .input(
      z.object({
        id: z.string(),
        title: z.string().optional(),
        description: z.string().optional(),
        keywords: z.string().optional(),
        content: z.string().optional(),
        source: z.string().optional(),
        sourceUrl: z.string().optional(),
      }),
    )
    .mutation(async ({ input }) => {
      return await prisma.post.update({
        where: {
          id: input.id,
        },
        data: {
          ...input,
        },
      });
    }),
  delete: staffProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      return await prisma.post.delete({
        where: {
          id: input.id,
        },
      });
    }),
});

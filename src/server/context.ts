import * as trpcNext from '@trpc/server/adapters/next';

import { getSession } from 'next-auth/react';
import { inferAsyncReturnType } from '@trpc/server';

export async function createContext({
  req,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  res,
}: trpcNext.CreateNextContextOptions) {
  // Create your context based on the request object
  // Will be available as `ctx` in all your resolvers
  const session = await getSession({ req });
  return {
    session,
  };
}
export type Context = inferAsyncReturnType<typeof createContext>;

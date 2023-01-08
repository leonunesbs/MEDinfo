import { posts } from '.';
import { router } from '../trpc';

export const appRouter = router({
  posts,
});

// export type definition of API
export type AppRouter = typeof appRouter;

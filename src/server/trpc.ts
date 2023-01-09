import { TRPCError, initTRPC } from '@trpc/server';

import { Context } from './context';

// Avoid exporting the entire t-object
// since it's not very descriptive.
// For instance, the use of a t variable
// is common in i18n libraries.
const t = initTRPC.context<Context>().create();

const isStaff = t.middleware(({ next, ctx }) => {
  if (!ctx.session?.user.isStaff) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
    });
  }
  return next({
    ctx: {
      session: ctx.session,
    },
  });
});

// Base router and procedure helpers
export const router = t.router;
export const procedure = t.procedure;
export const staffProcedure = t.procedure.use(isStaff);

import { withAuth } from 'next-auth/middleware';

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(req) {
    return;
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        return !!token?.isStaff;
      },
    },
  },
);

export const config = { matcher: ['/posts/add', '/posts/:path*/edit'] };

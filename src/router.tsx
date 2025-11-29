import { createRouter as createTanstackRouter } from '@tanstack/react-router';
import { queryClient } from '~/lib/tanstack-query';
import { routeTree } from './routeTree.gen';

export const router = createTanstackRouter({
  routeTree,
  context: {
    queryClient,
  },
  defaultNotFoundComponent: () => <div>Not Found</div>,
  defaultPreload: 'intent',
  defaultPreloadStaleTime: 0,
  defaultStructuralSharing: true,
});

export type Router = typeof router;

declare module '@tanstack/react-router' {
  interface Register {
    router: Router;
  }
}

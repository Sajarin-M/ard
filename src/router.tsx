import { createRouter } from '@tanstack/react-router';
import { setupRouterSsrQueryIntegration } from '@tanstack/react-router-ssr-query';
import { routeTree } from '~/routeTree.gen';
import * as TanstackQuery from '~/lib/tanstack-query/root-provider';

export const getRouter = () => {
  const queryContext = TanstackQuery.getContext();

  const router = createRouter({
    routeTree,
    context: { ...queryContext },
    defaultPreload: 'intent',
    defaultViewTransition: true,
    defaultNotFoundComponent: () => <div>Not Found</div>,
    Wrap: (props: { children: React.ReactNode }) => {
      return <TanstackQuery.Provider {...queryContext}>{props.children}</TanstackQuery.Provider>;
    },
  });

  setupRouterSsrQueryIntegration({
    router,
    queryClient: queryContext.queryClient,
  });

  return router;
};

export type Router = ReturnType<typeof getRouter>;

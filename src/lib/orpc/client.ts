import { createORPCClient } from '@orpc/client';
import { RPCLink } from '@orpc/client/fetch';
import { createRouterClient, type InferRouterInputs, type InferRouterOutputs } from '@orpc/server';
import type { RouterClient } from '@orpc/server';
import { createTanstackQueryUtils } from '@orpc/tanstack-query';
import { createIsomorphicFn } from '@tanstack/react-start';
import { getRequestHeaders } from '@tanstack/react-start/server';
import { env } from '~/env';
import type { ORPCRouter } from '~/lib/orpc/router';

declare global {
  var __orpcRouter: ORPCRouter | undefined;
}

if (typeof window === 'undefined') {
  global.__orpcRouter = await import('~/lib/orpc/router').then((m) => m.orpcRouter);
}

const getORPCClient = createIsomorphicFn()
  .server(() => {
    return createRouterClient(global.__orpcRouter, {
      context: () => ({
        headers: getRequestHeaders(),
      }),
    });
  })
  .client((): RouterClient<ORPCRouter> => {
    const link = new RPCLink({
      url: `${window.location.origin}/api/rpc`,
    });
    return createORPCClient(link);
  });

export const client: RouterClient<ORPCRouter> = getORPCClient();

export const orpc = createTanstackQueryUtils(client);

export type RouterInputs = InferRouterInputs<ORPCRouter>;
export type RouterOutputs = InferRouterOutputs<ORPCRouter>;

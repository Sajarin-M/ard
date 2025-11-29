import { TanStackDevtools } from '@tanstack/react-devtools';
import { formDevtoolsPlugin } from '@tanstack/react-form-devtools';
import type { QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtoolsPanel } from '@tanstack/react-query-devtools';
import { createRootRouteWithContext, Outlet } from '@tanstack/react-router';
import '@tanstack/react-router-devtools';
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools';
import { Toaster } from '~/components/ui/sonner';

interface MyRouterContext {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: RootComponent,
});

function RootComponent() {
  return (
    <>
      <Outlet />
      <TanStackDevtools
        config={{ position: 'bottom-left', openHotkey: ['Control', 'Shift', 'T'] }}
        plugins={[
          formDevtoolsPlugin(),
          {
            name: 'TanStack Query',
            render: <ReactQueryDevtoolsPanel />,
          },
          {
            name: 'TanStack Router',
            render: <TanStackRouterDevtoolsPanel />,
          },
        ]}
      />
      <Toaster />
    </>
  );
}

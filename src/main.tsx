import { scan } from 'react-scan';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from '@tanstack/react-router';
import { router } from '~/router';
import { queryClient, TanstackQueryProvider } from '~/lib/tanstack-query';
import './styles.css';
import { StrictMode } from 'react';
import { env } from './env';

scan({
  enabled: env.VITE_ENABLE_REACT_SCAN,
});

function App() {
  return (
    <TanstackQueryProvider>
      <RouterProvider router={router} context={{ queryClient }} />
    </TanstackQueryProvider>
  );
}

const rootElement = document.getElementById('app')!;

if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}

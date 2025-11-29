import { useNavigate, useRouter, type NavigateOptions } from '@tanstack/react-router';
import type { Router } from '~/router';
import { ArrowLeft } from 'lucide-react';
import { Button } from '~/components/ui/button';

type BackButtonProps = Omit<React.ComponentProps<typeof Button>, 'children'> & {
  route: NavigateOptions<Router>;
  shouldUseHistory?: boolean;
};

export const BackButton = ({
  route,
  onClick,
  variant = 'outline',
  size = 'icon-sm',
  shouldUseHistory = false,
  ...props
}: BackButtonProps) => {
  const router = useRouter();
  const navigate = useNavigate();

  return (
    <Button
      {...props}
      variant={variant}
      size={size}
      onClick={(e) => {
        if (shouldUseHistory && router.history.canGoBack()) {
          router.history.back();
        } else {
          navigate(route);
        }
        onClick?.(e);
      }}
      onMouseEnter={() => {
        if (!shouldUseHistory) {
          router.preloadRoute(route);
        }
      }}
    >
      <ArrowLeft />
    </Button>
  );
};

import { Loader2 } from 'lucide-react';
import { Button } from '~/components/ui/button';

export type LoadingButtonProps = React.ComponentProps<typeof Button> & {
  isLoading?: boolean;
};

export function LoadingButton({ children, isLoading, disabled, ...rest }: LoadingButtonProps) {
  return (
    <Button {...rest} disabled={isLoading || disabled}>
      {isLoading && <Loader2 className='size-4 animate-spin' />}
      {children}
    </Button>
  );
}

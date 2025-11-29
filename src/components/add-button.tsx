import { PlusIcon } from 'lucide-react';
import { Button } from '~/components/ui/button';

export function AddButton({ children, ...props }: React.ComponentProps<typeof Button>) {
  return (
    <Button {...props}>
      <PlusIcon className='size-4' />
      {children}
    </Button>
  );
}

import * as React from 'react';
import { Label as LabelPrimitive } from 'radix-ui';
import { cn } from '~/lib/utils';

function Label({
  className,
  withAsterisk = false,
  ...props
}: React.ComponentProps<typeof LabelPrimitive.Root> & { withAsterisk?: boolean }) {
  return (
    <LabelPrimitive.Root
      data-slot='label'
      className={cn(
        'flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50',
        withAsterisk &&
          'relative w-fit after:absolute after:top-0 after:-right-2.5 after:text-muted-foreground after:content-["*"]',
        className,
      )}
      {...props}
    />
  );
}

export { Label };

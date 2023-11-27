import React from 'react'

import { cn } from '@/lib/utils'
import { ExternalLink } from '@/components/external-link'

export function FooterText({ className, ...props }: React.ComponentProps<'p'>) {
  return (
    // <div className='flex flex-col gap-2'>
     
      <p
        className={cn(
          'px-2 text-center text-xs leading-normal text-muted-foreground',
          className
        )}
        {...props}
      >
        {/* Learn where this can be used{" "} */}
        <ExternalLink href="https://tailwind-nextjs-starter-blog-eight-gamma.vercel.app/about/">Learn where this can be used</ExternalLink>
      </p>
    // </div>
  )
}

import { UseChatHelpers } from 'ai/react'

import { Button } from '@/components/ui/button'
import { ExternalLink } from '@/components/external-link'
import { IconArrowRight } from '@/components/ui/icons'

const exampleMessages = [
  // {
  //   heading: 'List the benefits of hot yoga',
  //   message: `What are the benefits of hot yoga?`
  // },
  {
    heading: 'What are your services?',
    message: `What are your services?`
  },
  {
    heading: 'What classes do you have?',
    message: `What classes are available?`
  },
  {
    heading: 'What is the pricing?',
    message: 'What is the pricing for Yoga Mala classes?'
  },
  {
    heading: 'Do you have a free trial?',
    message: `Do you have a free trial?`
  },
  
]

export function EmptyScreen({ setInput }: Pick<UseChatHelpers, 'setInput'>) {
  return (
    <div className="mx-auto max-w-2xl px-4">
      <div className="rounded-lg border bg-background p-8">
        <h1 className="mb-2 text-lg font-semibold">
          Welcome to Yoga Mala Chatbot!
        </h1>
        <p className="mb-2 leading-normal text-muted-foreground">
          This is an demo AI chatbot built for Yoga Mala Singapore by{' '}
          <ExternalLink href="https://tailwind-nextjs-starter-blog-eight-gamma.vercel.app/about/">BlackOrchid AI</ExternalLink>
          .
        </p>
        <p className="leading-normal text-muted-foreground">
          You can start a conversation here or try the following examples:
        </p>
        <div className="mt-4 flex flex-col items-start space-y-2">
          {exampleMessages.map((message, index) => (
            <Button
              key={index}
              variant="link"
              className="h-auto p-0 text-base"
              onClick={() => setInput(message.message)}
            >
              <IconArrowRight className="mr-2 text-muted-foreground" />
              {message.heading}
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}

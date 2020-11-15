import { Flex, Heading, Link, Stack, Text } from '@chakra-ui/react'

type Talk = {
  name: string
  location: string
  href: string
}

const talks: Array<Talk> = [
  {
    name: 'Code-first GraphQL Server Development with Nexus & Prisma',
    location: 'PragueJS 2019 #4',
    href: 'https://www.youtube.com/watch?v=rTJYIfae7Rk',
  },
]

export const Speaking = () => (
  <Stack>
    <Heading as="h2" size="lg">
      Speaking
    </Heading>
    {talks.map((talk, i) => (
      <Flex key={i} justifyContent="space-between">
        <Link
          href={talk.href}
          target="_blank"
          rel="noopener noreferrer"
          data-splitbee-event={`Click talk - ${talk.name}`}
        >
          <Heading as="h3" size="xs">
            {talk.name}
          </Heading>
        </Link>
        <Text fontSize="sm">{talk.location}</Text>
      </Flex>
    ))}
  </Stack>
)

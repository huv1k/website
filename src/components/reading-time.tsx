import { HStack, Icon, Text } from '@chakra-ui/react'
import { BookOpenIcon } from '@heroicons/react/24/outline'

type Props = {
  time: string
}

export const ReadingTime = ({ time }: Props) => (
  <HStack>
    <Icon boxSize={4} as={BookOpenIcon} />
    <Text fontSize="sm">{time}</Text>
  </HStack>
)

import { HStack, Icon, Text } from '@chakra-ui/react'
import { BookOpenIcon } from '@heroicons/react/24/outline'

type Props = {
  time: string
}

export const ReadingTime = ({ time }: Props) => (
  <HStack>
    <Icon boxSize={4} as={BookOpenIcon} color="gray.500" />
    <Text fontSize="sm" color="gray.500">
      {time}
    </Text>
  </HStack>
)

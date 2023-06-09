import { Flex, HStack, Text } from '@chakra-ui/react'

import { Avatar } from './avatar'
import { ReadingTime } from './reading-time'
import { ViewCounter } from './view-counter'

type Props = {
  slug: string
  readingTime?: string
}

export const PostHeader = ({ slug, readingTime }: Props) => (
  <Flex width="100%" alignItems="center" justifyContent="space-between">
    <HStack>
      <Avatar alt="Lukáš Huvar" src="/lukas-huvar.jpg" width={24} height={24} />
      <Text fontWeight="bold">Lukáš Huvar</Text>
    </HStack>
    <HStack>
      {readingTime && <ReadingTime time={readingTime} />}
      <ViewCounter slug={slug} />
    </HStack>
  </Flex>
)

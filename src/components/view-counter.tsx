import { HStack, Icon, Text } from '@chakra-ui/react'
import { EyeIcon } from '@heroicons/react/24/outline'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import useSWR from 'swr'

type Props = {
  track?: boolean
  slug?: string
}

export const ViewCounter = ({ track = true, slug }: Props) => {
  const { pathname } = useRouter()
  const slugPath = slug ?? pathname

  const { data } = useSWR(
    `/api/page-views?slug=${encodeURIComponent(slugPath)}`
  )

  useEffect(() => {
    if (track) {
      const registerView = () =>
        fetch(`/api/increase-page-views?slug=${encodeURIComponent(slugPath)}`)

      registerView()
    }
  }, [slugPath, track])

  return (
    <HStack>
      <Icon boxSize={4} as={EyeIcon} />
      <Text fontSize="sm">{data ? data.count : '~'} views</Text>
    </HStack>
  )
}

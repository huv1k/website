import { Text } from '@chakra-ui/react'
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
    <Text fontSize="sm" color="gray.500">
      {data ? data.count : '~'} views
    </Text>
  )
}

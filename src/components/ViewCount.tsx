import { useEffect } from 'react'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import fetch from 'unfetch'

export const ViewCounter = () => {
  const { pathname } = useRouter()
  const { data } = useSWR(
    `/api/page-views?slug=${encodeURIComponent(pathname)}`
  )

  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      const registerView = () =>
        fetch(`/api/increase-page-views?slug=${encodeURIComponent(pathname)}`)

      registerView()
    }
  }, [pathname])

  return <div>{data ? data.count : ''}</div>
}

import {
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Button,
  Input,
  useToast,
} from '@chakra-ui/core'
import { useCallback, useState } from 'react'
import { Mail } from 'react-feather'

export const Subscribe = () => {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const toast = useToast()

  const subscribe = useCallback(async () => {
    setLoading(true)
    const req = await fetch('/api/subscribe', {
      method: 'POST',
      body: JSON.stringify({ email }),
      headers: {
        'Content-type': 'application/json',
      },
    })

    const res = await req.json()
    const sucess = req.status === 201

    toast({
      description: res.message,
      status: sucess ? 'success' : 'error',
    })

    if (sucess) {
      setEmail('')
    }
    setLoading(false)
  }, [email])

  return (
    <InputGroup>
      <InputLeftElement
        width="1.5ren"
        children={<Mail size={16} />}
        color="gray.500"
      />
      <Input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <InputRightElement width="6.75rem">
        <Button
          isLoading={loading}
          fontWeight="bold"
          h="1.75rem"
          size="xs"
          onClick={subscribe}
        >
          Subscribe
        </Button>
      </InputRightElement>
    </InputGroup>
  )
}

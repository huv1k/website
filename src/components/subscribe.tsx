import {
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Button,
  Input,
  useToast,
  Box,
  Heading,
  Text,
} from '@chakra-ui/react'
import { useCallback, useState } from 'react'
import { Mail } from 'react-feather'
import { EMAIL_REGEX } from '../lib/utils'

export const Subscribe = () => {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const toast = useToast()

  const subscribe = useCallback(async () => {
    setLoading(true)

    if (EMAIL_REGEX.exec(email)) {
      const formatedEmail = email.trim()

      const req = await fetch('/api/subscribe', {
        method: 'POST',
        body: JSON.stringify({ email: formatedEmail }),
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
        ;(window as any).splitbee.track('Signup for newsletter')
        ;(window as any).splitbee.user.set({ email: formatedEmail })
        setEmail('')
      }
      setLoading(false)
    } else {
      toast({
        description: `Email: ${email} is not valid email format.`,
        status: 'error',
      })
    }
    setLoading(false)
  }, [email])

  return (
    <Box
      padding={6}
      border="1px solid"
      background="cyan.50"
      borderColor="cyan.300"
      borderRadius="base"
    >
      <Heading as="p" size="lg" mb={2}>
        Don’t miss the next post!
      </Heading>
      <Text mb={4}>
        Sign up for the newsletter from me, about different topics going trough
        my mind.
      </Text>
      <InputGroup>
        <InputLeftElement
          width="1.5ren"
          children={<Mail size={16} />}
          color="gray.500"
        />
        <Input
          type="email"
          aria-label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          background="white"
          placeholder="your@email.com"
        />
        <InputRightElement width="4.75rem">
          <Button
            isLoading={loading}
            fontWeight="bold"
            h="1.75rem"
            size="xs"
            onClick={subscribe}
          >
            Join
          </Button>
        </InputRightElement>
      </InputGroup>
    </Box>
  )
}

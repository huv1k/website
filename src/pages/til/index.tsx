import { Heading, Text } from '@chakra-ui/react'
import { Layout } from '../../components/layout'

const TodayILearned = () => {
  return (
    <Layout>
      <Heading mb={4}>today i learned</Heading>
      <Text fontSize="lg">
        Collection of small notes, that I learned or want to get back to. Often,
        people ask me how to do certain things. So this is a place where I will
        put all the answers.
      </Text>
    </Layout>
  )
}

export default TodayILearned

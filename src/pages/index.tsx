import { Flex, Heading, Text } from '@chakra-ui/react'
import * as React from 'react'
import { Layout } from '../components/layout'
import { Speaking } from '../components/speaking'

const Index = () => {
  return (
    <Layout>
      <Flex flexDirection="column" mb={20}>
        <Text>Lukáš Huvar</Text>
        <Heading as="h1" size="2xl">
          Huvik
        </Heading>
        <Text>
          Software developer passionate about <b>React</b>, <b>GraphQL</b>,
          <b>Typescript</b>
        </Text>
      </Flex>
      <Speaking />
    </Layout>
  )
}

export default Index

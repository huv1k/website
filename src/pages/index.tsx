import * as React from 'react'
import { Flex, Heading, Text } from '@chakra-ui/core'
import { Layout } from '../components/layout'

const Index = () => {
  return (
    <Layout>
      <Flex flexDirection="column">
        <Text>Lukáš Huvar</Text>
        <Heading as="h1" size="2xl">
          Huvik
        </Heading>
        <Text>
          Software developer passionate about <b>React</b>, <b>GraphQL</b>,
          <b>Typescript</b>
        </Text>
      </Flex>
    </Layout>
  )
}

export default Index

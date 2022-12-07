import { createYoga } from 'graphql-yoga'
import { NextApiRequest, NextApiResponse } from 'next'

import { schema } from '../../lib/schema'

const server = createYoga<{
  req: NextApiRequest
  res: NextApiResponse
}>({
  cors: false,
  graphqlEndpoint: '/api/graphql',
  schema,
})

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
}

export default server

import { createServer } from '@graphql-yoga/node'
import { NextApiRequest, NextApiResponse } from 'next'

import { schema } from '../../lib/schema'

const server = createServer<{
  req: NextApiRequest
  res: NextApiResponse
}>({
  cors: false,
  endpoint: '/api/graphql',
  schema,
})

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
}

export default server

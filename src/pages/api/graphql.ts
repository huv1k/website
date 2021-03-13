import {
  getGraphQLParameters,
  processRequest,
  renderGraphiQL,
  shouldRenderGraphiQL,
} from 'graphql-helix'
import { NextApiHandler } from 'next/types'
import { schema } from '../../lib/schema'

export default (async (req, res) => {
  const request = {
    body: req.body,
    headers: req.headers,
    method: String(req.method),
    query: req.query,
  }

  if (shouldRenderGraphiQL(request)) {
    res.send(renderGraphiQL({ endpoint: '/api/graphql' }))
  } else {
    const { operationName, query, variables } = getGraphQLParameters(request)

    const result = await processRequest({
      operationName,
      query,
      variables,
      request,
      schema,
    })

    if (result.type === 'RESPONSE') {
      result.headers.forEach(({ name, value }) => res.setHeader(name, value))
      res.status(result.status).json(result.payload)
    }
  }
}) as NextApiHandler

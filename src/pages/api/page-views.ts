import { PrismaClient } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'

const prisma = new PrismaClient()

const PageVIews = async (req: NextApiRequest, res: NextApiResponse) => {
  const { slug = '/' } = req.query

  console.log('Here')

  const count = await prisma.view.count({
    where: {
      slug: slug as string,
    },
  })

  console.log(count)

  res.json({ count })
}

export default PageVIews

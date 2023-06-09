import { PrismaClient } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'

const prisma = new PrismaClient()

const PageVIews = async (req: NextApiRequest, res: NextApiResponse) => {
  const { slug = '/' } = req.query

  const count = await prisma.view.count({
    where: {
      slug: slug as string,
    },
  })

  res.json({ count: count > 0 ? count : 1 })
}

export default PageVIews

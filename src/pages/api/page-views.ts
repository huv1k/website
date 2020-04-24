import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { slug = '/' } = req.query

  const count = await prisma.view.count({
    where: {
      slug: slug as string,
    },
  })

  res.json({ count })
}

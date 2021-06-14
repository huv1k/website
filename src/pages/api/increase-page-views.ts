import { PrismaClient } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'

const prisma = new PrismaClient()

const IncreasePageVIews = async (req: NextApiRequest, res: NextApiResponse) => {
  const { slug = '/' } = req.query

  const count = await prisma.view.create({
    data: { slug: slug as string },
  })

  res.json({ count })
}

export default IncreasePageVIews

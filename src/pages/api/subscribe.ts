import { NextApiRequest, NextApiResponse } from 'next'
import { EMAIL_REGEX } from '../../lib/utils'

type Data = {
  email?: string
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { email } = req.body as Data

  if (!email) {
    return res.status(400).json({ message: 'Email is required' })
  }

  if (!EMAIL_REGEX.test(email)) {
    return res
      .status(400)
      .json({ message: `Email ${email} is in invalid format` })
  }

  try {
    const response = await fetch(
      `https://api.mailerlite.com/api/v2/groups/${process.env.MAILERLITE_GROUP_ID}/subscribers`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-MailerLite-ApiKey': process.env.MAILERLITE_API_KEY,
        },
        body: JSON.stringify({ email }),
      }
    )

    if (response.status === 200) {
      return res
        .status(201)
        .json({ message: 'You sucessfully subscribed to the newsletter' })
    }

    const { error } = await response.json()

    return res.status(400).json({ message: error.message })
  } catch (e) {
    // TODO: replace with sentry
    console.error(e)
    return res.status(500).json({ message: 'Internal server error!' })
  }
}

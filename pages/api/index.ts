import type { NextApiRequest, NextApiResponse } from 'next'
import { connectToDatabase } from '../../utils/db'

connectToDatabase()

type Data = {
    name: string
}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    res.status(200).json({ name: 'Recipe app' })
}

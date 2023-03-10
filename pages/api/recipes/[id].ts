import type { NextApiRequest, NextApiResponse } from 'next'
import Recipe from '../../../models/recipe'
import { RecipeType } from '../../../types'
import { connectToDatabase } from '../../../utils/db'

type Data = {
    message: string,
} | RecipeType

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    await connectToDatabase()

    const { method, body, query } = req
    const { id } = query as { id: string }

    switch (method) {
        case 'GET':
            try {
                const recipe: RecipeType | null = await Recipe.findById(id)
                if (!recipe) return res.status(404).json({ message: 'recipe not found' })
                return res.status(200).json(recipe)
            } catch (error) {
                return res.status(500).json({ message: 'something went wrong' })
            }
        case 'PUT':
            try {
                const recipe: RecipeType | null = await Recipe.findById(id)
                if (!recipe) return res.status(404).json({ message: 'recipe not found' })
                await Recipe.findByIdAndUpdate(id, body)
                return res.status(201).json({ message: 'recipe updated' })
            } catch (error) {
                return res.status(500).json({ message: 'something went wrong' })
            }
        case 'DELETE':
            try {
                const recipe: RecipeType | null = await Recipe.findById(id)
                if (!recipe) return res.status(404).json({ message: 'recipe not found' })
                await Recipe.findByIdAndDelete(id)
                return res.status(201).json({ message: 'recipe deleted' })
            } catch (error) {
                return res.status(500).json({ message: 'something went wrong' })
            }
        default:
            return res.status(400).json({ message: 'method not supported' })
    }
}

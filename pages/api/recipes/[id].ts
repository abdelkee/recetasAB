import type { NextApiRequest, NextApiResponse } from 'next'
import { RecipeType } from '.'
import Recipe from '../../../models/recipe'
import { connectToDatabase } from '../../../utils/db'

connectToDatabase()

type Data = {
    message: string,
} | RecipeType

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const { method, body, query: { id } } = req
    switch (method) {
        case 'GET':
            try {
                const recipe: RecipeType | null = await Recipe.findById(id)
                if (!recipe) return res.status(404).json({ message: 'recipe not found' })
                res.status(200).json(recipe)
            } catch (error) {
                res.status(500).json({ message: 'something went wrong' })
            }
        case 'PUT':
            try {
                const recipe: RecipeType | null = await Recipe.findById(id)
                if (!recipe) return res.status(404).json({ message: 'recipe not found' })
                await Recipe.findByIdAndUpdate(id, body)
                res.status(201).json({ message: 'recipe updated' })
            } catch (error) {
                res.status(500).json({ message: 'something went wrong' })
            }
        case 'DELETE':
            try {
                const recipe: RecipeType | null = await Recipe.findById(id)
                if (!recipe) return res.status(404).json({ message: 'recipe not found' })
                await Recipe.findByIdAndDelete(id)
                res.status(201).json({ message: 'recipe deleted' })
            } catch (error) {
                res.status(500).json({ message: 'something went wrong' })
            }
        default:
            res.status(400).json({ message: 'method not supported' })
    }
}

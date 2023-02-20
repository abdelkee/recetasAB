import type { NextApiRequest, NextApiResponse } from 'next'
import Recipe from '../../../models/recipe'
import { RecipeType } from '../../../types'
import { connectToDatabase } from '../../../utils/db'

connectToDatabase()

type Data = {
  message: string,
} | RecipeType[]

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { method, body } = req
  switch (method) {
    case 'GET':
      try {
        const recipes: RecipeType[] = await Recipe.find()
        res.status(200).json(recipes)
      } catch (error) {
        res.status(500).json({ message: 'something went wrong' })
      }
    case 'POST':
      try {
        const new_recipe = new Recipe(body)
        await Recipe.create(new_recipe)
        res.status(201).json({ message: 'recipe created' })
      } catch (error) {
        res.status(500).json({ message: 'something went wrong' })
      }
    default:
      res.status(400).json({ message: 'method not supported' })
  }
}

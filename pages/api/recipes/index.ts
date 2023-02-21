import type { NextApiRequest, NextApiResponse } from 'next'
import Recipe from '../../../models/recipe'
import { RecipeType } from '../../../types'
import { connectToDatabase } from '../../../utils/db'


type Data = {
  message: string,
} | RecipeType[]

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  await connectToDatabase()
  const { method, body } = req
  switch (method) {
    case 'GET':
      try {
        const recipes: RecipeType[] = await Recipe.find()
        return res.status(200).json(recipes)
      } catch (error) {
        return res.status(500).json({ message: 'something went wrong' })
      }
    case 'POST':
      try {
        const new_recipe = new Recipe(body)
        await Recipe.create(new_recipe)
        return res.status(201).json({ message: 'recipe created' })
      } catch (error) {
        return res.status(500).json({ message: 'something went wrong' })
      }
    default:
      return res.status(400).json({ message: 'method not supported' })
  }
}

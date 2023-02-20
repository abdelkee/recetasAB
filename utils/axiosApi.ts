import axios from "axios";
import { RecipeData, RecipeType } from "../types";

// const url = process.env.NODE_ENV === 'production'
//     ? 'https://recetas-ab.vercel.app/api'
//     : 'http://localhost:3000/api'

const url = 'https://recetas-ab.vercel.app/api'

export const axiosApi = axios.create({
    baseURL: url
});

export const getRecipes = async () => {
    const { data } = await axiosApi.get('/recipes') as { data: RecipeType[] }
    return data
}

export const getRecipe = async (id: string) => {
    const { data } = await axiosApi.get('/recipes/' + id) as { data: RecipeType }
    return data
}

export const createRecipe = async (recipe: RecipeData) => {
    const { data } = await axiosApi.post('/recipes', recipe) as { data: { message: string } }
    return data.message
}
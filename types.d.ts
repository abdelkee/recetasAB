export type RecipeType = {
    _id: string
    title: string
    image?: string
    mode: string[]
    ingredients: IngredientType[]
    steps: string[]
}

export type IngredientType = {
    title: string
    quantity: string
    measurement: string
}

export type RecipeData = Omit<RecipeType, "_id">;
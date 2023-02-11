import { model, models, Schema } from "mongoose";

const required_string = {
    type: String,
    required: true,
    trim: true
}

const recipeSchema = new Schema({
    title: required_string,
    ingredients: [{
        title: required_string,
        measurement: required_string,
        quantity: required_string
    }],
    steps: [{
        description: required_string
    }]
}, {
    timestamps: false,
    versionKey: false
})

export default models.Recipe || model('Recipe', recipeSchema)
import { model, models, Schema } from "mongoose";

const required_string = {
    type: String,
    required: true,
    trim: true
}

const recipeSchema = new Schema({
    title: required_string,
    image: {
        type: String,
        default: 'https://images.assetsdelivery.com/compings_v2/bsd555/bsd5552011/bsd555201101792.jpg'
    },
    mode: [{
        type: String,
        trim: true,
        default: 'horno'
    }],
    duration: Number,
    ingredients: [{
        title: required_string,
        measurement: required_string,
        quantity: required_string
    }],
    steps: [required_string]
}, {
    timestamps: false,
    versionKey: false
})

export default models.Recipe || model('Recipe', recipeSchema)
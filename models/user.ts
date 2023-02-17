import { model, models, Schema } from "mongoose";


const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    }
}, { timestamps: false, versionKey: false })

export default models.User || model('User', userSchema)
import mongoose , {Schema} from "mongoose"


const userSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    empnumber:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    role:{
        type: String,
        required: true
    },
    password:{
        type: String
    },
    status:{
        type: String,
        required: true
    }
})


export const User = mongoose.model("User", userSchema)
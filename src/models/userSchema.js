import mongoose from "mongoose"


const userSchema = mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true
    },
    phNo:{
        type:Number
    },
    role:{
        type:String,
        enum:['Admin','Customer'],
        default:"Customer"
    },
    points:{
        type:Number,
        default:0
    },
    coupon:{
        type:Number,
        default:0
    },
    profile_img:{
        type:String
    }
},{timestamps:true})


const Users = mongoose.model('Users',userSchema)

export default Users;
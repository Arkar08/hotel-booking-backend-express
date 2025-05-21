import mongoose from "mongoose";


const discountSchema = mongoose.Schema({
    code:{
        type:String,
        require:true
    },
    discountAmount:{
        type:Number,
        require:true
    },
    expiryDate:{
        type:String,
        require:true
    },
    isActive:{
        type:Boolean,
        default:true
    },
    isClaimed:{
        type:Boolean,
        default:false
    }
},{timstamps:true})

const Discount = mongoose.model("Discout",discountSchema)

export default Discount;
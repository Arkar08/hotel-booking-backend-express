import mongoose from "mongoose";

const roomSchema = mongoose.Schema({
    roomNo:{
        type:Number,
        require:true
    },
    roomType:{
        type:String,
        require:true
    },
    price:{
        type:Number,
        require:true
    },
    status:{
        type:String,
        enum:["Available","Check-In","Check-Out","Booked"],
        default:"Available"
    },
    isFeatured:{
        type:Boolean,
        default:false
    },
    description:{
        type:String
    },
    imgUrl:{
        type:Array,
        require:true
    }
},{timestamps:true})


const Rooms = mongoose.model("Rooms",roomSchema)

export default Rooms;
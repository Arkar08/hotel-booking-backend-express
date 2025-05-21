import mongoose from "mongoose"

const bookingSchema = mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        refs:"Users",
        require:true
    },
    roomId:{
        type:mongoose.Schema.Types.ObjectId,
        refs:"Rooms",
        require:true
    },
    couponId:{
        type:mongoose.Schema.Types.ObjectId,
        refs:"Coupon"
    },
    checkIn:{
        type:String,
        require:true
    },
    guestCount:{
        type:Number,
        require:true
    },
    checkOut:{
        type:String,
        require:true
    },
    depositAmount:{
        type:Number
    },
    status:{
        type:String,
        enum:["Pending",'Cancelled',"Approved","Paid"],
        default:"Pending"
    },
    totalAmount:{
        type:Number,
        require:true
    }
},{timestamps:true})


const Booking = mongoose.model("Booking",bookingSchema)

export default Booking;
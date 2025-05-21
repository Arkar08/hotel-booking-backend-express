import Booking from "../models/bookingSchema.js";
import Discount from "../models/discountSchema.js";
import Rooms from "../models/roomSchema.js";
import Users from "../models/userSchema.js";


export const postBooking = async(req,res)=>{

    const {userId,roomId,couponId,checkIn,checkOut,guestCount,totalAmount} = req.body;

    if(!userId || !roomId || !checkIn || !checkOut || !guestCount || !totalAmount){
        return res.status(404).json({
            status:404,
            message:"Please Filled Out in the Form Field."
        })
    }
    try {
        const findUser = await Users.findOne({_id:userId})
        if(!findUser){
            return res.status(400).json({
                status:400,
                message:"Customer name and email does not exist."
            })
        }

        const findRoom = await Rooms.findOne({_id:roomId})
        if(!findRoom || findRoom.status !== 'Available'){
            return res.status(400).json({
                status:400,
                message:"RoomNo is not available"
            })
        }

        if(couponId){
            const findCoupon = await Discount.findOne({_id:couponId})
            if(!findCoupon || findCoupon.isActive === false || findCoupon.isClaimed === true){
                return res.status(400).json({
                    status:400,
                    message:'Coupon does not exist.'
                })
            }
        }
        
        const newBooking = await Booking.create({
            userId:userId,
            roomId:roomId,
            couponId:couponId,
            checkIn:checkIn,
            checkOut:checkOut,
            guestCount:guestCount,
            totalAmount:totalAmount
        })

        if(newBooking){
            await Discount.findOneAndUpdate({_id:couponId},{isClaimed:true})
            await Rooms.findOneAndUpdate({_id:roomId},{status:"Booked"})

            return res.status(201).json({
                status:201,
                message:"Hotel Room Booking Successfully."
            })
        }

    } catch (error) {
        return res.status(500).json({
            status:500,
            message:error.message
        })
    }
}


export const getBooking = async(req,res)=> {
    try {
        const findBooking = await Booking.find({})

        return res.status(200).json({
            status:200,
            length:findBooking.length,
            data:findBooking
        })
    } catch (error) {
         return res.status(500).json({
            status:500,
            message:error.message
        })
    }
}

export const getIdBooking = async(req,res)=> {
    const {id} = req.params;
    if(!parseInt(id)){
        return res.status(400).json({
            status:400,
            message:"BookingId does not exist."
        })
    }
    try {
        const findBooking = await Booking.findOne({_id:id})
        if(!findBooking){
            return res.status(404).json({
                status:404,
                message:"Not Found"
            })
        }else{
            return res.status(200).json({
                status:200,
                data:findBooking
            })
        }
    } catch (error) {
        return res.status(500).json({
            status:500,
            message:error.message
        })
    }
}


export const patchBooking = async(req,res) => {
     const {id} = req.params;
     const {status} = req.body;
    if(!parseInt(id)){
        return res.status(400).json({
            status:400,
            message:"BookingId does not exist."
        })
    }
    try {
         const findBooking = await Booking.findOne({_id:id})
        if(!findBooking){
            return res.status(404).json({
                status:404,
                message:"Not Found"
            })
        }else{
           const updateBooking = await Booking.findOneAndUpdate({_id:id},{status:status})
           if(updateBooking){

                if(updateBooking.status === 'Cancelled'){
                    return res.status(200).json({
                        status:200,
                        message:"Booking Cancelled By Admin"
                    })
                }else{
                    await Rooms.findOneAndUpdate({_id:updateBooking.roomId},{status:"Check-In"})
                }
                const findUpdateBooking = await Booking.findOne({_id:id})

                return res.status(200).json({
                    status:200,
                    data:findUpdateBooking
                })
           }
        }
    } catch (error) {
          return res.status(500).json({
            status:500,
            message:error.message
        })
    }
}

export const createInvoice = async(req,res) => {
    const {bookingId} = req.body;

    if(!bookingId){
        return res.status(404).json({
            status:404,
            message:"BookingId does not exist."
        })
    }

    try {
        const findBooking = await Booking.findOne({_id:bookingId})
        if(!findBooking){
            return res.status(404).json({
                status:404,
                message:"Not Found"
            })
        }
        const updateBooking = await Booking.findOneAndUpdate({_id:bookingId},{status:"Paid"})
        if(updateBooking){
            const findRoom = await Rooms.findOne({_id:updateBooking.roomId})

            if(findRoom.status === 'Check-In'){
                await Rooms.findOneAndUpdate({_id:findRoom._id},{status:"Check-Out"})


                setTimeout(async()=>{
                    await Rooms.findOneAndUpdate({_id:findRoom._id},{status:"Available"})
                },60000)
            }
            return res.status(200).json({
                status:200,
                message:"Invoice Create Successfully."
            })
        }
    } catch (error) {
        return res.status(500).json({
            status:500,
            message:error.message
        })
    }
}

export const getUserBooking = async(req,res) => {
    const {userId} = req.params;
    if(!parseInt(userId)){
        return res.status(400).json({
            status:400,
            message:"userId does not exist."
        })
    }
    try {
        const findUser = await Users.findOne({_id:userId})
        if(!findUser){
            return res.status(404).json({
                status:404,
                message:"Not Found"
            })
        }

        const findUserBooking = await Booking.find({userId:userId})
        if(findUserBooking.length > 0){
            return res.status(200).json({
                status:200,
                length:findUserBooking.length,
                data:findUserBooking
            })
        }else{
            return res.status(200).json({
                status:200,
                message:"Booking History Not Found"
            })
        }

    } catch (error) {
         return res.status(500).json({
            status:500,
            message:error.message
        })
    }
}
import Discount from "../models/discountSchema.js";


export const postCoupon = async(req,res)=>{

    const {discountAmount,expiryDate} = req.body;

    if(!discountAmount || !expiryDate){
        return res.status(404).json({
            status:404,
            message:"Please filled out in the form field."
        })
    }

    try {
        const couponCode = generateRandomCode(8)
        const newCoupon = await Discount.create({
            code:couponCode,
            discountAmount:discountAmount,
            expiryDate:expiryDate
        })
        return res.status(201).json({
            status:201,
            data:newCoupon
        })
    } catch (error) {
        return res.status(500).json({
            status:500,
            message:error.mesage
        })
    }
}

export const getCoupon = async(req,res)=>{
    try {
        const findCoupon = await Discount.find({})

        return res.status(200).json({
            status:200,
            length:findCoupon.length,
            data:findCoupon
        })
    } catch (error) {
        return res.status(500).json({
            status:500,
            message:error.mesage
        })
    }
}

export const getIdCoupon = async(req,res)=>{
    const {id} = req.params;
    if(!parseInt(id)){
        return res.status(400).json({
            status:400,
            message:"couponId does not exist."
        })
    }
    try {
        const findCoupon = await Discount.findOne({_id:id})
        if(!findCoupon){
            return res.status(404).json({
                status:404,
                message:"Not Found"
            })
        }else{
            return res.status(200).json({
                status:200,
                data:findCoupon
            })
        }
    } catch (error) {
        return res.status(500).json({
            status:500,
            message:error.mesage
        })
    }
}

export const patchCoupon = async(req,res)=>{
     const {id} = req.params;
    if(!parseInt(id)){
        return res.status(400).json({
            status:400,
            message:"couponId does not exist."
        })
    }
     try {
        const findCoupon = await Discount.findOne({_id:id})
        if(!findCoupon){
            return res.status(404).json({
                status:404,
                message:"Not Found"
            })
        }else{
            const updateCoupon = await Discount.findOneAndUpdate({_id:id},{...req.body})
            if(updateCoupon){
                const findUpdateCoupon = await Discount.findOne({_id:id})
                return res.status(200).json({
                    status:200,
                    data:findUpdateCoupon
                })
            }
        }
    } catch (error) {
        return res.status(500).json({
            status:500,
            message:error.mesage
        })
    }
}


export const deleteCoupon = async(req,res)=>{
     const {id} = req.params;
    if(!parseInt(id)){
        return res.status(400).json({
            status:400,
            message:"couponId does not exist."
        })
    }
    try {
        const findCoupon = await Discount.findOne({_id:id})
        if(!findCoupon){
            return res.status(404).json({
                status:404,
                message:"Not Found"
            })
        }else{
            const deleteCoupon = await Discount.findOneAndDelete({_id:id})
            if(deleteCoupon){
                return res.status(200).json({
                    status:200,
                    message:"Delete Coupon Successfully."
                })
            }
        }
    } catch (error) {
        return res.status(500).json({
            status:500,
            message:error.mesage
        })
    }
}

export  const generateRandomCode = (length) =>{
            const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            let result = '';
            for (let i = 0; i < length; i++) {
                const randomIndex = Math.floor(Math.random() * characters.length);
                result += characters[randomIndex];
            }
            return result;
}
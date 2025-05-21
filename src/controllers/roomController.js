import Rooms from "../models/roomSchema.js";


export const postRoom = async(req,res)=>{

    const {roomNo,roomType,price,description,imgUrl} = req.body;

    if(!roomNo || !roomType || !price || !imgUrl){
        return res.status(404).json({
            status:404,
            message:"Please filled out in the form field."
        })
    }

    try {
        const findRoomNo = await Rooms.findOne({roomNo:roomNo})
        if(findRoomNo){
            return res.status(400).json({
                status:400,
                message:"RoomNo is already exist."
            })
        }else{
            const newRoom = await Rooms.create({
                roomNo:roomNo,
                roomType:roomType,
                price:price,
                imgUrl:imgUrl,
                description:description
            })

            return res.status(201).json({
                status:201,
                data:newRoom
            })
        }
    } catch (error) {
        return res.status(500).json({
            status:500,
            message:error.mesage
        })
    }
}

export const getRoom = async(req,res)=>{
    try {
        const findRoom = await Rooms.find({})

        return res.status(200).json({
            status:200,
            length:findRoom.length,
            data:findRoom
        })
    } catch (error) {
         return res.status(500).json({
            status:500,
            message:error.mesage
        })
    }
}

export const getIdRoom = async(req,res)=>{
     const {id} = req.params;
    if(!parseInt(id)){
        return res.status(400).json({
            status:400,
            message:"RoomId does not exist."
        })
    }
    try {
        const findRoom = await Rooms.findOne({_id:id})
        if(!findRoom){
            return res.status(404).json({
                status:404,
                message:"Not Found"
            })
        }else{
            return res.status(200).json({
                status:200,
                data:findRoom
            })
        }
    } catch (error) {
        return res.status(500).json({
            status:500,
            message:error.mesage
        })
    }
}

export const patchRoom = async(req,res)=>{
    const {id} = req.params;
    if(!parseInt(id)){
        return res.status(400).json({
            status:400,
            message:"RoomId does not exist."
        })
    }
    try {
        const findRoom = await Rooms.findOne({_id:id})
        if(!findRoom){
            return res.status(404).json({
                status:404,
                message:"Not Found"
            })
        }else{
           const updateRoom = await Rooms.findOneAndUpdate({_id:id},{...req.body})
           if(updateRoom){
            const findUpdateRoom = await Rooms.findOne({_id:id})
            return res.status(200).json({
                status:200,
                data:findUpdateRoom
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

export const deleteRoom = async(req,res)=>{
     const {id} = req.params;
    if(!parseInt(id)){
        return res.status(400).json({
            status:400,
            message:"roomId does not exist."
        })
    }
    try {
        const findRoom = await Rooms.findOne({_id:id})
        if(!findRoom){
            return res.status(404).json({
                status:404,
                message:"Not Found"
            })
        }else{
            const deleteRoom = await Rooms.findOneAndDelete({_id:id})
            if(deleteRoom){
                return res.status(200).json({
                    status:200,
                    message:"Delete Room Successfully."
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
import Users from '../models/userSchema.js'
import generateToken from '../utils/generateToken.js';
import bcrypt from 'bcryptjs'


export const postUser = async(req,res)=>{
    const {name,email,password,phNo,imgUrl} = req.body;

    if(!name || !email || !password){
        return res.status(404).json({
            status:404,
            message:"Please filled out in the form field."
        })
    }

    try {
        const findEmail = await Users.findOne({email:email})
        if(findEmail){
            return res.status(400).json({
                status:400,
                message:"Email is already exist."
            })
        }else{

                const salt = await bcrypt.genSalt(10);
                const hashPassword = await bcrypt.hash(password, salt);


            const newUser = await Users.create({
                name:name,
                email:email,
                password:hashPassword,
                phNo:phNo,
                imgUrl:imgUrl
            })

            const token =await generateToken(res,newUser._id)

            return res.status(201).json({
                status:201,
                data:newUser,
                token :token
            })
        }
    } catch (error) {
        return res.status(500).json({
            status:500,
            message:error.mesage
        })
    }
}

export const getUser = async(req,res)=>{
    try {
        const userList = await Users.find({})
        return res.status(200).json({
            status:200,
            length:userList.length,
            data:userList
        })
    } catch (error) {
        return res.status(500).json({
            status:500,
            message:error.mesage
        })
    }
}

export const getIdUser = async(req,res)=>{
    const {id} = req.params;
    if(!parseInt(id)){
        return res.status(400).json({
            status:400,
            message:"UserId does not exist."
        })
    }
    try {
        const findUser = await Users.findOne({_id:id})
        if(!findUser){
            return res.status(404).json({
                status:404,
                message:"Not Found"
            })
        }else{
            return res.status(200).json({
                status:200,
                data:findUser
            })
        }
    } catch (error) {
         return res.status(500).json({
            status:500,
            message:error.mesage
        })
    }
}

export const patchUser = async(req,res)=>{
    const {id} = req.params;
    if(!parseInt(id)){
        return res.status(400).json({
            status:400,
            message:"UserId does not exist."
        })
    }
    try {
        const findUser = await Users.findOne({_id:id})
        if(!findUser){
            return res.status(404).json({
                status:404,
                message:"Not Found"
            })
        }else{
            const updateUser = await Users.findOneAndUpdate({
                _id:id
            },{...req.body})
            if(updateUser){
                const findUpdateUser = await Users.findOne({_id:id})
                return res.status(200).json({
                    status:200,
                    data:findUpdateUser
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

export const deleteUser = async(req,res)=>{
    const {id} = req.params;
    if(!parseInt(id)){
        return res.status(400).json({
            status:400,
            message:"UserId does not exist."
        })
    }
    try {
        const findUser = await Users.findOne({_id:id})
        if(!findUser){
            return res.status(404).json({
                status:404,
                message:"Not Found"
            })
        }else{
            const deleteUser = await Users.findOneAndDelete({_id:id})
            if(deleteUser){
                return res.status(200).json({
                    status:200,
                    message:"Delete User Successfully."
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


export const signUpUser = async(req,res)=>{
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(404).json({
        status:404,
        message:"Please filled out in the form field."
      })
    }
    const findEmail = await Users.findOne({ email: email });

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    if (!findEmail) {
      const newUser = await Users.create({
        name: name,
        email: email,
        password: hashPassword
      });

      const token = await generateToken(res,newUser._id)      
       return res.status(201).json({
            status:201,
            email:newUser.email,
            id:newUser._id,
            token:token,
            message:"Register Successfully."
        })
    } else {
      return res.status(400).json({
        status:400,
        message:"Email is already exist"
      })
    }
  } catch (error) {
    console.log(error)
    return res.status(500).json({
        status:500,
        message:error.mesage
    })
  }
}

export const loginUser = async(req,res)=>{
  try {
    const {email,password} = req.body;
    const validatorEmail = await Users.findOne({email:email})
    if(!validatorEmail){
      return res.status(404).json({
            status:404,
            message:"Email does not exist."
        })
  }
    if(validatorEmail){
      const validatorPassword = await bcrypt.compare(password,validatorEmail.password)
      if(!validatorPassword){
        return res.status(404).json({
            status:404,
            message:"Passoword is wrong."
        })
      }
      if(validatorPassword){
        const token = await generateToken(res,validatorEmail._id)

        return res.status(200).json({
            status:200,
            email:validatorEmail.email,
            id:validatorEmail._id,
            token:token,
            message:"Login Successfully."
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

export const logout = async(req,res)=>{
    res.cookie("jwt", "", {
      httpOnly: true,
      maxAge: new Date(0),
    });
    return res.status(200).json({
        status:200,
        message:"Logout Successfully"
    });
}
import jwt from 'jsonwebtoken';

const generateToken = async(res,userId) => {
    const token = jwt.sign({userId},process.env.secretKey,{
        expiresIn:'30d'
    })
    if(!token){
        return res.status(400).json({
            status:400,
            message:"Invalid Token"
        })
    }

    res.cookie("jwt",token,{
        httpOnly:true,
        secure:process.env.node_env !== 'development',
        sameSite:"strict",
        maxAge:30 * 24 * 60 * 60 * 1000
    })

    return token;
}

export default generateToken;
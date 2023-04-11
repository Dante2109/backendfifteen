const jwt=require("jsonwebtoken");
const authenticate=async(req,res,next)=>{
    let token=req.headers.authorization;
    if(token){
        jwt.verify(token,"shh",(err,decoded)=>{
            if(decoded){
                body.user=decoded.userId;
                next()
            }else{
                res.status(401)
            }
        })
    }else{
        res.status(402)
    }
}
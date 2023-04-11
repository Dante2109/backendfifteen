const express=require("express")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken");
const { UserModel } = require("../Models/UserModel");
const e = require("express");
const userRouter=express.Router();


userRouter.get("/",async(req,res)=>{
    try {
        let data= await UserModel.find();
        res.send(data)
    } catch (error) {
        res.send(error)
    }
})

userRouter.post("/register",async(req,res)=>{
    let body=req.body;
    try {
        let data= await UserModel.find({email:body.email})
        if(data.length){
            res.status(401)
        }else{
            bcrypt.hash(body.password,5,(err,hash)=>{
                if(hash){
                    let user=new UserModel({...body,password:hash})
                    user.save();
                    res.send("User has been registered")
                }else{
                    res.status(402)
                }
            })
        }
    } catch (error) {
        res.send(error)
    }
})


userRouter.post("/login",async(req,res)=>{
    let body=req.body;
    try {
        let data= await UserModel.find({email:body.email})
        if(data.length){
            bcrypt.compare(body.password,data[0].password,(err,result)=>{
                if(result){
                    const token=jwt.sign({userId:data[0]._id},"shh")
                    res.send({msg:"User has been successfully registered",token})
                }else{
                    res.status(406)
                }
            })
        }else{
            res.status(402)
        }
    } catch (error) {
        res.send(error)
    }
})


module.exports={
    userRouter
}
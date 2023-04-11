const express=require("express");
const { BoardModel, TaskModel, SubtaskModel } = require("../Models/BoardModel");
const Boardrouter=express.Router();



Boardrouter.get("/",async(req,res)=>{
    let boardid=req.params.id
    console.log("/")
    try {
        let data=await BoardModel.find()
        . populate(["tasks",{path:"tasks",populate:{path:"subtask"}}]); 
        res.send(data)
    } catch (error) {
        res.send(error)        
    }
})
Boardrouter.post("/addBoard",async(req,res)=>{
    let body=req.body
    console.log("post")
    try {
        let board=new BoardModel(body)
        await board.save()
        res.send({msg:"done"})
    } catch (error) {
        console.log("hsd")
        console.log(error)
        res.send(error)
    }
})

Boardrouter.post("/addtask/:id",async(req,res)=>{
    let body=req.body;
    let id=req.params.id
    try {
        let subtasks=body.subtasks;
        let arr2=[]
        for(let j=0;j<subtasks.length;j++){
            let data=new SubtaskModel(subtasks[j])
            await data.save();
            arr2.push(data._id)
        }
        console.log(arr2)
        body={...body,subtask:arr2}
        let task=new TaskModel(body);
        await task.save();

        let board=await BoardModel.findById(id)
        let arr=[...board.tasks,task._id];
        let update=await BoardModel.findByIdAndUpdate(id,{$set:{tasks:arr}},{new:true}).populate(["tasks",{path:"tasks",populate:{path:"subtask"}}])
        res.send(update)
    } catch (error) {
        console.log(error)
        res.send(error)
    }
})

Boardrouter.post("/addsubtask/:id/:taskid",async(req,res)=>{
    let body=req.body;
    let boardId=req.params.id;
    let taskId=req.params.taskid;
    console.log("subtask")
    try {
        let data= await SubtaskModel(body);
        data.save();
        let tasks=await TaskModel.findById(taskId)
        let subtask=tasks.subtask;
        subtask.push(data._id);
        const update=await TaskModel.findByIdAndUpdate(taskId,{$set:{subtask}},{new:true})
        const board=await BoardModel.findById(boardId).populate(["tasks",{path:"tasks",populate:{path:"subtask"}}])
        res.send(board)
    } catch (error) {
        console.log(error)
        res.send(error)
    }
})

Boardrouter.patch("/editsubtask/:board/:id",async(req,res)=>{
    let id=req.params.id
    let boardId=req.params.board
    try {
        let data1=await SubtaskModel.findById(id)
        let data=await SubtaskModel.findByIdAndUpdate(id,{isCompleted:!data1.isCompleted})
        const board=await BoardModel.findById(boardId).populate(["tasks",{path:"tasks",populate:{path:"subtask"}}])
        res.send({msg:"Updated",data:board})
    } catch (error) {
        res.send(error)
        
    }
})

Boardrouter.patch("/edittask/:board/:id",async(req,res)=>{
    let id=req.params.id
    let boardId=req.params.board
    let body=req.body
    try {
        let data1=await TaskModel.findById(id);
        let data=await TaskModel.findByIdAndUpdate(id,body)
        let data2=await BoardModel.findById(boardId).populate(["tasks",{path:"tasks",populate:{path:"subtask"}}])
        res.send(data2)
    } catch (error) {
        res.send(error)
    }
})
module.exports={
    Boardrouter
}
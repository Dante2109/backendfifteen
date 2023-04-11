const mongoose=require("mongoose");


const boardSchema=mongoose.Schema({
    // _id: mongoose.Schema.Types.ObjectId,
     name: String,
     tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task'}]
   },{versionKey:false})


const tasksSchema=mongoose.Schema({
        // _id: mongoose.Schema.Types.ObjectId,
       title : String,
       description : String,
       status : {type: String, enum: ['Todo', 'Doing', 'Done'], default: 'Todo'},
       subtask : [{ type: mongoose.Schema.Types.ObjectId, ref: 'Subtasks'}]
   },{versionKey:false})

const subTaskSchema=mongoose.Schema(
   {
    // _id: mongoose.Schema.Types.ObjectId,
       title : String,
       isCompleted : Boolean
   },{versionKey:false}
   )

const SubtaskModel=mongoose.model("Subtasks",subTaskSchema);
const TaskModel=mongoose.model("Task",tasksSchema);
const BoardModel=mongoose.model("Board",boardSchema);
module.exports={
    BoardModel,
    SubtaskModel,
    TaskModel
}
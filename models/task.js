 require('dotenv').config();
 const mongoose=require('mongoose');
 
mongoose.connect(process.env.DATABASE_URL) 
    .then(() => console.log("Connected to MongoDB Atlas!"))
    .catch(err => console.error("Connection error:", err));

const taskSchema=mongoose.Schema({
    title:String,
    description:String,
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    status:{
        type:String,
        enum:["pending","in-progress","completed"],
        default:"pending"
    }
   
 })

module.exports = mongoose.model("task",taskSchema)

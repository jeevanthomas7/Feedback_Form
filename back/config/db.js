const mongoose=require('mongoose');

async function connectDb() {
try {
   await mongoose.connect("mongodb://127.0.0.1:27017/feedback-form")
   console.log("Database connnected") 
} catch (error) {
    console.log("not conneceted")
}
    
}

module.exports=connectDb;
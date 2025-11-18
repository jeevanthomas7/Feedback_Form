const express=require('express')
const env=require('dotenv').config();
const cors=require('cors');
const connectDb = require('./config/db');
const route=require("./routes/userRoutess")
const app=express();
const port='https://feedback-formback.vercel.app/' 

app.use(express.json())
app.use(cors());

connectDb();

app.use('/form',route)

app.get('/',(req,res)=>{
    res.send("Workinggg new Updates")
})

app.listen(port,()=>{
    console.log(`sercer running http://localhost:${port}`)
})

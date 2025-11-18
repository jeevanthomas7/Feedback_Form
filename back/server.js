const express=require('express')
const env=require('dotenv').config();
const cors=require('cors');
const connectDb = require('./config/db');
const route=require("./routes/userRoutess")
const app=express();
const port=process.env.PORT 

app.use(express.json())
app.use(cors({
    origin:"http://localhost:5174"
}))

connectDb();

app.use('/form',route)

app.get('/',(req,res)=>{
    res.send("Workinggg")
})

app.listen(port,()=>{
    console.log(`sercer running http://localhost:${port}`)
})

const {form,getfeddback,deleteForm}=require('../controllers/userController')
const exps=require("express").Router();

exps.post('/',form)
exps.get("/",getfeddback)
exps.delete('/:id',deleteForm)
module.exports=exps;



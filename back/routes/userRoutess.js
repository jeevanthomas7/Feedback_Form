const {form,getfeddback,deleteForm, check}=require('../controllers/userController')
const exps=require("express").Router();

exps.post('/',form)
exps.get('/new',check)
exps.get("/",getfeddback)
exps.delete('/:id',deleteForm)
module.exports=exps;




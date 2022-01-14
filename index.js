require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const app =express()
const cors =require('cors')
const User = require('./models/login')

app.use(cors({origin:"*",}))
app.use(express.json())

mongoose.connect(`mongodb+srv://${process.env.DB_NAME}:${process.env.DB_PASSWORD}@cluster0.b24rp.mongodb.net/mi-store?retryWrites=true&w=majority`,()=>console.log("connected to db"))



app.post('/login',async(req,res)=>{
    const body =req.body
    const {email,password} = body
    const data = await User.find({email:email,password:password})
    try{
        if(data.length===0){
            res.send({message:"no user found",loggedin:false})
        }
        else{
            res.send({message:"user logged in sucessfully",loggedin:true})
        }
    }catch(err){
        res.send({
            message:err,
            signedin:false,
            page:false})
        console.log(err)
    }
    
    
})

app.post('/register',async(req,res)=>{
    const body =req.body
    const {email} = body
    const data = await User.find({email:email})
    try{
        if(data.length===0){
            User.create(body)
            res.send({message:"User has been created sucessfully",
            signedin:true,
            page:true})
        }
        else{
            res.send({message:`A user already exists with the email ${email}`,
            signedin:false,
            page:false})
        }
    }
    catch(err){
        
        res.send({
            message:err,
            signedin:false,
            page:false})
        
    }
   
    
})

app.listen(process.env.PORT ,()=>{
    console.log("live")
})
const express=require('express')
const app=express();
const bodyParser=require('body-parser');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const cors= require('cors')

app.use(bodyParser.json());
app.use(cors());

app.post('/getResponse',(req,res)=>{
    console.log(req.body.question)
    const genAI = new GoogleGenerativeAI('AIzaSyDNkDqSdKikehfT7ryyz_5_Jh18bBe8EKM');
    const model = genAI.getGenerativeModel ({model: "gemini-1.5-flash"});

    model.generateContent(req.body.question).then(result=>{
        console.log(result.response.text());
        const response = result.response.text();
        res.status(200).json({
            respinse:response
        })
    
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        })    
    })
})

app.get('*',(req,res)=>{
    res.status(404).json({
        msg:'bad request'
    })
})
    

module.exports=app;
const express=require('express')

const mongoose = require('mongoose')
const passport=require('passport')
var cors = require('cors')
require('dotenv').config();

const app=express()
app.use(cors())
//init middleware

app.use(express.json({extended:false}));

app.use(passport.initialize())
require('./passport')(passport)
app.get("/",(req,res)=>{
    res.json({
        massage:"welcome our application"
    })
})
//Define router
app.use('/api/users',require('./routers/api/users'));
app.use('/api/auth',require('./routers/api/auth'));


const port=process.env.PORT || 5000
app.listen(port,()=>{
    console.log(`server is running on port ${port}`)
 
mongoose.connect(process.env.CONNECTION_URL, 
{useNewUrlParser: true, useUnifiedTopology: true,useCreateIndex:true ,useFindAndModify :false},()=>{
    console.log('database connected')
});

})
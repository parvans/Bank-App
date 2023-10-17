import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import User from './Routes/User.js'
import config from './config/config.js'
import Admin from './Routes/Admin.js'
config()


dotenv.config()
const app = express();
app.use(cors())
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());



app.use('/api',User)
app.use('/api',Admin)

app.get('/',(req,res)=>{
    res.send("Working")
})


const port =process.env.PORT || 8000
app.listen( process.env.PORT || 8000,() =>{
    console.log(`server is running in port ${port}`);
})
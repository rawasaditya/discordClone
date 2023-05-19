const express = require('express');
const http = require('http');
const cors = require('cors');
const mongoose = require('mongoose'); 
const routers = require('./routes/authRoutes');
require('dotenv').config();

const PORT = process.env.PORT || process.env.API_PORT;

const app = express();
app.use(express.json());
app.use(cors());
// Registering routes
app.use('/api/auth',routers) 


app.listen(PORT,()=>{
    console.log(`Server started`);
    mongoose.connect(process.env.MONGO_URL)
    .then(()=>{
        console.log("MONGO DB CONNECTED")
    })
    .catch(err=>{
        console.error(err)
    })
})

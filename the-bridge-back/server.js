const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose=require('mongoose');
const app = express();
const port = 3000;
const morgan = require('morgan');
require('dotenv').config();
app.use(cors());
app.use('/uploads', express.static(__dirname+'/uploads'));
const courseRouter=require('./Router/courseRouter');

app.use('/courses',courseRouter);

const url=process.env.MONGODB_URL;

app.use(morgan('dev'));

const server=require('http').createServer(app);


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

// app.use(cors({origin:'http://127.0.0.1:5173'}));

mongoose.connect(url);

const db=mongoose.connection;
db.on('error',console.error.bind(console,'connection error:'));
db.once('open',()=>{
    console.log('Connected to MongoDB');
});

server.listen(port,()=>console.log(`Server is running on port ${port}`));
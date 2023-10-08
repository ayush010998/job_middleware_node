const express=require('express');

const errorMiddleware=require('./middlewares/errorMiddleware');

require('dotenv').config()

const cors=require("cors");

const morgan=require("morgan");

const connectDb=require('./db/db');

connectDb();

const authRoutes=require("./routes/authRoutes");
const jobRoutes=require('./routes/jobsRoutes');

const userRoutes=require("./routes/userRoutes");










const app=express();

app.use(express.json());
app.use(cors());
app.use(morgan());

app.use('/',authRoutes);

app.use('/user',userRoutes);

app.use('/create-job',jobRoutes);




app.use(errorMiddleware);

const PORT=process.env.PORT||8080;


app.listen(PORT,()=>{
    console.log("hello server")
})
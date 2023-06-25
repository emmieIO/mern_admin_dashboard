import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';
import clientRoutes from './routes/client.js'
import generalRoutes from './routes/general.js'
import managementRoutes from './routes/management.js'
import salesRoutes from './routes/sales.js'

/*Configurations*/

dotenv.config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(helmet);
app.use(helmet.crossOriginResourcePolicy({policy:"cross-origin"}))
app.use(morgan('common'));
app.use(cors());

/**
 * ROUTES
 */

app.use("/client", clientRoutes);
app.use("/general", generalRoutes);
app.use("/management", managementRoutes);
app.use("/sales", salesRoutes);

// Port
const PORT = 7000 || process.env.PORT

// mongoDb using Mongoose
mongoose.connect(process.env.MONGO_URI,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    app.listen(PORT,()=>{
        console.log('Server up and running...');
        console.log('MongDB connection estalished...');
    });
}).catch((err)=>{
    console.log( "database connection failed::"+err)
})



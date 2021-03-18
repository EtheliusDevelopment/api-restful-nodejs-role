import express from 'express'
import dotenv from 'dotenv'
const connectDB = require ('./database');
var path = require('path');
import morgan from 'morgan'
import pkg from '../package.json'
import productRoutes from './routes/product.routes'


dotenv.config({path: './config.env'});
connectDB()



const app = express()


app.set('pkg', pkg);

app.use(morgan('dev'));
app.use(express.json());

app.get('/', (req, res) => {
    res.json({
        name : app.get('pkg').name,
        author : app.get('pkg').author,
        description : app.get('pkg').description,
        version: app.get('pkg').version
    })
})

app.use('/products', productRoutes);



export default app;

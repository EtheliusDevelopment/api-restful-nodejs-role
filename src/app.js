import express from 'express'
import dotenv from 'dotenv'
const connectDB = require ('./database');
import morgan from 'morgan'
import pkg from '../package.json'

import {createRoles} from './libs/initialSetup'

import productRoutes from './routes/product.routes'
import authRoutes from './routes/auth.routes'


dotenv.config({path: './config.env'});
connectDB()



const app = express()
createRoles();


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

app.use('/api/products', productRoutes)
app.use('/api/auth', authRoutes)



export default app;

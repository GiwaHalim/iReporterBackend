import mongoose from 'mongoose';
import logger from '../logger';
import config from 'config';


export default function(){
    // const mongoUrl = "mongodb+srv://iReporteradmin:12345@cluster07126.vzblzil.mongodb.net/?retryWrites=true&w=majority&appName=Cluster07126"
    const mongoUrl = config.get('db')
    mongoose.connect(mongoUrl)
    .then(()=>{
        logger.info(`Connected to ${mongoUrl}`)
    })
    }
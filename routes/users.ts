import config from 'config';
import jwt from 'jsonwebtoken';
import express from 'express';
import mongoose from 'mongoose';
import { User, validateUser } from '../model/usersModel';
import bcrypt from 'bcrypt';

const router = express.Router();




router.post('/', async (req: any, res: any, next) => {
    const result = validateUser(req.body)
    if (result.error) return res.status(400).send(result.error.details[0].message);
    
    try{
        let user = await User.findOne({email: req.body.email})
        if (user) return res.status(400).send('user already exist')
        
        const saltRounds = 10;
        const myPlaintextPassword = req.body.password;
        
        const salt = await bcrypt.genSalt(saltRounds)
        const hash = await bcrypt.hash(myPlaintextPassword, salt)
        
        user = new User({
            email: req.body.email,
            password: hash,
            address: req.body.address,
            city: req.body.city,
            state: req.body.state,
            zip: req.body.zip,
            isAdmin: false
        })
        
        user.save()
        const token = user.generateAuthToken();
        
        
        res.send({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: token
        })
        
    }catch(ex){
        next(ex)
    }
        
        
    })
    
    
    
export default router;
import express from 'express';
import home from '../routes/home';
import user from '../routes/users';
import auth from '../routes/auth';
import report from '../routes/report';
import cors from 'cors';
import err from '../middleware/error';


export default function(app){
    app.use(cors())
    app.use(express.json())
    app.use('/', home)
    app.use('/api/user', user)
    app.use('/api/auth', auth)
    app.use('/api/report', report)
    app.use(err)
}
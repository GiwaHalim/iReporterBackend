import express from 'express';
import Joi from 'joi';
import bcrypt from 'bcrypt';
import { User } from '../model/usersModel'

const router = express.Router();


router.post('/', async(req: any, res: any) => {
    const result = validateUser(req.body)

    if (result.error) return res.status(400).send(result.error.details[0].message);

    let user = await User.findOne({email: req.body.email})
    if (!user) return res.status(400).send('invalid Email or Password')

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send('invalid Email or Password')

    const token = user.generateAuthToken();

    res.send({
        email: user.email,
        _id: user._id,
        token: token
    })
})

function validateUser(user) {
    const validationSchema = Joi.object({
        email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
        password: Joi.string().required(),
      })
     return  validationSchema.validate({
        email:user.email,
        password:user.password,
      })
}

export default router
const express = require('express');
const router = express.Router();
const Joi = require('joi');



router.post('/', (req, res) => {
    const result = validateUser(req.body)

    if (result.error) return res.status(400).send(result.error.details[0].message);

})

function validateUser(user) {
    const validationSchema = Joi.object({
        email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
        password: Joi.string().required(),
        address: Joi.string().required(),
        city: Joi.string().required(),
        zip: Joi.number().required()
      })
     return  validationSchema.validate({
        email:user.email,
        password:user.password,
        address:user.address,
        city:user.city,
        zip:user.zip
      })
}


module.exports = router;
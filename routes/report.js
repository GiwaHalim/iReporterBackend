const Report = require('../model/reportModel');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const Joi = require('joi');


router.get('/', async (req, res) => {


    try{
        await Report.find({}).then((data) => { res.send(data)})
    } catch(err){
        res.send(err)
    }
})

router.get('/:user', async (req, res) => {
    
    const params = req.params.user
    try{
        await Report.find({userId: params}).then((data) => { res.send(data)})

    }catch(err) {
        res.send(err)
    }
})

router.delete('/:id', async (req, res) => {
    try{
      const { id } = req.params;
      const deletedDocument = await Report.findByIdAndDelete(id);

      if (!deletedDocument) {
        return res.status(404).send({ error: 'Document not found' });
      }

      res.send(deletedDocument)

    } catch(err){
        console.error('Error deleting document:', err);
      res.status(500).send({ error: 'Internal Server Error' });
    }

})

router.post('/', (req, res) => {
    const result = validate(req.body);

    if (result.error) return res.status(400).send(result.error.details[0].message);

    report = new Report({
        title: req.body.title,
        description: req.body.description,
        type: req.body.type,
        date: new Date(),
        status:"Pending",
        userId: req.body.userId
    })

    report.save()
    res.send(req.body)

})

router.put('/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const newData = req.body;
      const updatedData = await Report.findByIdAndUpdate(id, newData, { new: true });
      res.send(updatedData);
    } catch (err) {
      console.error('Error updating document:', err);
      res.status(500).send({ error: 'Internal Server Error' });
    }
    

  });


function validate(report) {
    const validationSchema = Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
      })
     return  validationSchema.validate({
        title: report.title,
        description: report.description,
      })
    }

module.exports = router
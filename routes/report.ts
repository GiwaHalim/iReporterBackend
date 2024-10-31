import Report from '../model/reportModel';
import mongoose from 'mongoose';
import express from 'express';
import Joi from 'joi';
import auth from '../middleware/auth';

const router = express.Router();


router.get('/', auth,  async (req, res, next) => {
        await Report.find({}).then((data) => { res.send(data)})
})

router.get('/:user', async (req, res, next) => {
    const params = req.params.user

    await Report.find({userId: params}).then((data) => { res.send(data)})

   
})

router.delete('/:id', async (req: any, res: any, next) => {
    try{
      const { id } = req.params;
      const deletedDocument = await Report.findByIdAndDelete(id);

      if (!deletedDocument) {
        return res.status(404).send({ error: 'Document not found' });
      }

      res.send(deletedDocument)

    } catch(err){
        next(err)
    }

})

router.post('/', auth, async (req: any, res: any, next) => {
    const result = validate(req.body);
    if (result.error) return res.status(400).send(result.error.details[0].message);

    const report = new Report({
        title: req.body.title,
        description: req.body.description,
        type: req.body.type,
        date: new Date(),
        status:"Pending",
        userId: req.body.userId
    })

    try{
      const reportResult = await report.save()
      res.send(reportResult)
    }catch(ex){
      next(ex)
    }

    

})

router.put('/:id', auth, async (req, res, next) => {
    try {
      const { id } = req.params;
      const newData = req.body;
      const updatedData = await Report.findByIdAndUpdate(id, newData, { new: true });
      res.send(updatedData);
    } catch (err) {
      next(err)
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

export default router
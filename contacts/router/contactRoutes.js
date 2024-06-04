import express from 'express';
import { getContact,createContact,updateContact,deleteContact,getContactById } from '../controllers/contactController.js';
import validateToken from '../middleware/validate.js';
const router=express.Router();

router.use(validateToken)

router.get('/',getContact)

router.post('/',createContact)

router.get('/:id',getContactById)

router.put('/:id',updateContact)

router.delete('/:id',deleteContact)



export default router;
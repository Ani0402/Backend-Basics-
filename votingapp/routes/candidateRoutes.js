import express from 'express';

import Candidate from '../models/candidate.js'

import User from '../models/users.js'

import { jwtAuthMiddleware,genToken } from '../jwt.js';

const router=express.Router()



export default router;
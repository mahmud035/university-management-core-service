import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { StudentController } from './student.controller';
import { StudentValidation } from './student.validation';

const router = express.Router();

router.get('/:id', StudentController.getSingleStudent);

router.post(
  '/create-student',
  validateRequest(StudentValidation.create),
  StudentController.createStudent
);

export const StudentRoutes = router;

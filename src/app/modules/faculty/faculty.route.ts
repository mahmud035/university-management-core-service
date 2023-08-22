import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { FacultyController } from './faculty.controller';
import { FacultyValidation } from './faculty.validation';

const router = express.Router();

router.post(
  '/create-faculty',
  validateRequest(FacultyValidation.create),
  FacultyController.createFaculty
);

export const FacultyRoutes = router;
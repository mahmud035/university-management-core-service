import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicFacultyController } from './academicFaculty.controller';
import { AcademicFacultyZodValidation } from './academicFaculty.validation';

const router = express.Router();

router.get('/:id', AcademicFacultyController.getSingleAcademicFaculty);

router.post(
  '/create-faculty',
  validateRequest(AcademicFacultyZodValidation.create),
  AcademicFacultyController.createAcademicFaculty
);

export const AcademicFacultyRoutes = router;

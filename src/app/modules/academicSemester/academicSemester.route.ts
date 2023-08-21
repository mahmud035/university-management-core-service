import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicSemesterController } from './academicSemester.controller';
import { AcademicSemesterZodValidation } from './academicSemester.validation';

const router = express.Router();

router.get('/', AcademicSemesterController.getAllSemester);

router.get('/:id', AcademicSemesterController.getSingleSemester);

router.post(
  '/create-semester',
  validateRequest(AcademicSemesterZodValidation.create),
  AcademicSemesterController.createAcademicSemester
);

export const AcademicSemesterRoutes = router;

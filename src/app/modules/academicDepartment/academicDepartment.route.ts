import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicDepartmentController } from './academicDepartment.controller';
import { AcademicDepartmentZodValidation } from './academicDepartment.validation';

const router = express.Router();

router.post(
  '/create-department',
  validateRequest(AcademicDepartmentZodValidation.create),
  AcademicDepartmentController.createAcademicDepartment
);

export const AcademicDepartmentRoutes = router;

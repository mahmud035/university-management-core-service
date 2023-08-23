import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicDepartmentController } from './academicDepartment.controller';
import { AcademicDepartmentZodValidation } from './academicDepartment.validation';

const router = express.Router();

router.get('/', AcademicDepartmentController.getAllAcademicDepartment);

router.get('/:id', AcademicDepartmentController.getSingleAcademicDepartment);

router.post(
  '/create-department',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  validateRequest(AcademicDepartmentZodValidation.create),
  AcademicDepartmentController.createAcademicDepartment
);

router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  validateRequest(AcademicDepartmentZodValidation.update),
  AcademicDepartmentController.updateAcademicDepartment
);

export const AcademicDepartmentRoutes = router;

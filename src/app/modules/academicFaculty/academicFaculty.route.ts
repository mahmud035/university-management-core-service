import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicFacultyController } from './academicFaculty.controller';
import { AcademicFacultyZodValidation } from './academicFaculty.validation';

const router = express.Router();

router.get('/', AcademicFacultyController.getAllAcademicFaculty);

router.get('/:id', AcademicFacultyController.getSingleAcademicFaculty);

router.post(
  '/create-faculty',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  validateRequest(AcademicFacultyZodValidation.create),
  AcademicFacultyController.createAcademicFaculty
);

router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  validateRequest(AcademicFacultyZodValidation.update),
  AcademicFacultyController.updateAcademicFaculty
);

export const AcademicFacultyRoutes = router;

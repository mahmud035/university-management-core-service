import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { CourseController } from './course.controller';
import { CourseZodValidation } from './course.validation';

const router = express.Router();

router.post(
  '/create-course',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  validateRequest(CourseZodValidation.create),
  CourseController.createCourse
);

export const CourseRoutes = router;

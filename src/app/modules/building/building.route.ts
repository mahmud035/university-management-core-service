import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { BuildingController } from './building.controller';
import { BuildingZodValidation } from './building.validation';

const router = express.Router();

router.get('/:id', BuildingController.getSingleBuilding);

router.post(
  '/create-building',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  validateRequest(BuildingZodValidation.create),
  BuildingController.createBuilding
);

export const BuildingRoutes = router;

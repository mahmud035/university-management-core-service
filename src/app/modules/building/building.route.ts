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

router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  validateRequest(BuildingZodValidation.update),
  BuildingController.updateSingleBuilding
);

export const BuildingRoutes = router;

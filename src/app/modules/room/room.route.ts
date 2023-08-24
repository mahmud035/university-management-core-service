import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { RoomController } from './room.controller';
import { RoomZodValidation } from './room.validation';

const router = express.Router();

router.get('/', RoomController.getAllRoom);

router.get('/:id', RoomController.getSingleRoom);

router.post(
  '/create-room',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  validateRequest(RoomZodValidation.create),
  RoomController.createRoom
);

router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  validateRequest(RoomZodValidation.update),
  RoomController.updateRoom
);

router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  RoomController.deleteRoom
);

export const RoomRoutes = router;

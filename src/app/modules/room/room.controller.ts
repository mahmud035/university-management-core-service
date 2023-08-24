import { Room } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { RoomService } from './room.services';

const createRoom = catchAsync(async (req: Request, res: Response) => {
  const result = await RoomService.createRoom(req.body);

  sendResponse<Room>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Room Created Successfully',
    data: result,
  });
});

export const RoomController = {
  createRoom,
};

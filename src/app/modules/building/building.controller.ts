import { Building } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { BuildingService } from './building.services';

const createBuilding = catchAsync(async (req: Request, res: Response) => {
  const result = await BuildingService.createBuilding(req.body);

  sendResponse<Building>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Building Created Successfully',
    data: result,
  });
});

const getSingleBuilding = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await BuildingService.getSingleBuilding(id);

  sendResponse<Building>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Retrieved Single Building Data',
    data: result,
  });
});

const updateSingleBuilding = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const data = req.body;
  const result = await BuildingService.updateSingleBuilding(id, data);

  sendResponse<Building>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Building Updated Successfully',
    data: result,
  });
});

const deleteSingleBuilding = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await BuildingService.deleteSingleBuilding(id);

  sendResponse<Building>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Building Deleted Successfully',
    data: result,
  });
});

export const BuildingController = {
  createBuilding,
  getSingleBuilding,
  updateSingleBuilding,
  deleteSingleBuilding,
};

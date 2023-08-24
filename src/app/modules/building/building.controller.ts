import { Building } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { buildingFilterableFields } from './building.constant';
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

const getAllBuilding = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, buildingFilterableFields);
  const options = pick(req.query, ['page', 'limit', 'sortBy', 'sortOrder']);

  // console.log('filters', filters);
  // console.log('options', options);

  const result = await BuildingService.getAllBuilding(filters, options);

  sendResponse<Building[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Retrieved All Building Data',
    meta: result.meta,
    data: result.data,
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
  getAllBuilding,
  getSingleBuilding,
  updateSingleBuilding,
  deleteSingleBuilding,
};

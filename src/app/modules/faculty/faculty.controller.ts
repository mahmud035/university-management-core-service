import { Faculty } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { FacultyService } from './faculty.services';

const createFaculty = catchAsync(async (req: Request, res: Response) => {
  console.log(req.body);
  const result = await FacultyService.createFaculty(req.body);

  sendResponse<Faculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty Created Successfully',
    data: result,
  });
});

export const FacultyController = {
  createFaculty,
};

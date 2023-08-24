/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { CourseService } from './course.services';

const createCourse = catchAsync(async (req: Request, res: Response) => {
  // console.log(req.body);
  const result = await CourseService.createCourse(req.body);

  sendResponse<any>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course Created Successfully',
    data: result,
  });
});

export const CourseController = {
  createCourse,
};

import { AcademicSemester } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { AcademicSemesterService } from './academicSemester.services';

const createAcademicSemester = catchAsync(
  async (req: Request, res: Response) => {
    const result = await AcademicSemesterService.createAcademicSemester(
      req.body
    );

    sendResponse<AcademicSemester>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Semester created successfully',
      data: result,
    });
  }
);

const getAllSemester = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, [
    'searchTerm',
    'title',
    'code',
    'startMonth',
    'endMonth',
  ]);
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);

  // console.log('filters', filters);
  // console.log('options', options);

  const result = await AcademicSemesterService.getAllSemester(filters, options);

  sendResponse<AcademicSemester[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Retrieved all Academic Semester',
    meta: result.meta,
    data: result.data,
  });
});

export const AcademicSemesterController = {
  createAcademicSemester,
  getAllSemester,
};

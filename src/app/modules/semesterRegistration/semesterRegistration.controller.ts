import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { SemesterRegistrationService } from './semesterRegistration.services';

const createSemesterRegistration = catchAsync(
  async (req: Request, res: Response) => {
    const result = await SemesterRegistrationService.createSemesterRegistration(
      req.body
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Semester Registration created successfully',
      data: result,
    });
  }
);

const getSingleSemesterRegistration = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const result =
      await SemesterRegistrationService.getSingleSemesterRegistration(id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Semester Registration fetched successfully',
      data: result,
    });
  }
);

const deleteSemesterRegistration = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await SemesterRegistrationService.deleteSemesterRegistration(
      id
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Semester Registration deleted successfully',
      data: result,
    });
  }
);

export const SemesterRegistrationController = {
  createSemesterRegistration,
  getSingleSemesterRegistration,
  deleteSemesterRegistration,
};

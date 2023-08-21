/* eslint-disable @typescript-eslint/no-explicit-any */
import { AcademicSemester, Prisma, PrismaClient } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { academicSemesterFilterableFields } from './academicSemester.contant';
import { IAcademicSemesterRequest } from './academicSemester.interface';

const prisma = new PrismaClient();

const createAcademicSemester = async (
  academicSemesterData: AcademicSemester
): Promise<AcademicSemester> => {
  const result = await prisma.academicSemester.create({
    data: academicSemesterData,
  });

  return result;
};

const getAllSemester = async (
  filters: IAcademicSemesterRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<AcademicSemester[]>> => {
  const { page, limit, skip } = paginationHelpers.calculatePagination(options);

  const { searchTerm, ...filterData } = filters;

  // console.log('filters:', filters);
  // console.log('filterData:', filterData); // Object

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: academicSemesterFilterableFields.map((field) => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

  if (Object.keys(filterData).length) {
    andConditions.push({
      AND: Object.keys(filterData).map((key) => ({
        [key]: {
          equals: (filterData as any)[key], // dynamically access filterData object's value.
        },
      })),
    });
  }

  const whereConditions: Prisma.AcademicSemesterWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.academicSemester.findMany({
    skip,
    take: limit,

    // Filtering
    where: whereConditions,
  });
  const total = await prisma.academicSemester.count();

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

export const AcademicSemesterService = {
  createAcademicSemester,
  getAllSemester,
};

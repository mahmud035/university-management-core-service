/* eslint-disable @typescript-eslint/no-explicit-any */
import { Prisma, Student } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import {
  studentRelationalFields,
  studentRelationalFieldsMapper,
  studentSearchableFields,
} from './student.constant';
import { IStudentFilterRequest } from './student.interface';

const createStudent = async (studentData: Student): Promise<Student> => {
  const result = await prisma.student.create({
    data: studentData,

    // NOTE: Same as Mongoose Populate
    include: {
      academicSemester: true,
      academicFaculty: true,
      academicDepartment: true,
    },
  });

  return result;
};

const getAllStudent = async (
  filters: IStudentFilterRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<Student[]>> => {
  // Pagination
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);

  // Searching & Filtering
  const { searchTerm, ...filterData } = filters;

  // console.log('filters:', filters);
  // console.log('filterData:', filterData); // Object

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: studentSearchableFields.map((field) => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map((key) => {
        if (studentRelationalFields.includes(key)) {
          return {
            [studentRelationalFieldsMapper[key]]: {
              id: (filterData as any)[key],
            },
          };
        } else {
          return {
            [key]: {
              equals: (filterData as any)[key],
            },
          };
        }
      }),
    });
  }

  const whereConditions: Prisma.StudentWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.student.findMany({
    // Populate
    include: {
      academicSemester: true,
      academicFaculty: true,
      academicDepartment: true,
    },

    // Pagination
    skip,
    take: limit,

    // Searching & Filtering
    where: whereConditions,

    // Sorting
    orderBy:
      options.sortBy && options.sortOrder
        ? {
            [options.sortBy]: options.sortOrder,
          }
        : {
            createdAt: 'desc',
          },
  });

  const total = await prisma.student.count({
    where: whereConditions,
  });

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleStudent = async (id: string): Promise<Student | null> => {
  const result = await prisma.student.findUnique({
    where: {
      id,
    },

    // NOTE: Same as Mongoose Populate
    include: {
      academicSemester: true,
      academicFaculty: true,
      academicDepartment: true,
    },
  });

  return result;
};

const updateSingleStudent = async (
  id: string,
  payload: Partial<Student>
): Promise<Student> => {
  const result = await prisma.student.update({
    where: {
      id,
    },

    // What to Update
    data: payload,

    // Populate
    include: {
      academicSemester: true,
      academicFaculty: true,
      academicDepartment: true,
    },
  });

  return result;
};

const deleteSingleStudent = async (id: string): Promise<Student | null> => {
  const result = await prisma.student.delete({
    where: {
      id,
    },

    // Populate
    include: {
      academicSemester: true,
      academicFaculty: true,
      academicDepartment: true,
    },
  });

  return result;
};

export const StudentService = {
  createStudent,
  getAllStudent,
  getSingleStudent,
  updateSingleStudent,
  deleteSingleStudent,
};

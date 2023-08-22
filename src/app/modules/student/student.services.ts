import { Student } from '@prisma/client';
import prisma from '../../../shared/prisma';

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

const getAllStudent = async (): Promise<Student[]> => {
  const result = await prisma.student.findMany({
    // NOTE: Same as Mongoose Populate
    include: {
      academicSemester: true,
      academicFaculty: true,
      academicDepartment: true,
    },
  });

  return result;
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

export const StudentService = {
  createStudent,
  getAllStudent,
  getSingleStudent,
};

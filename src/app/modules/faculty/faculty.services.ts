import { Faculty } from '@prisma/client';
import prisma from '../../../shared/prisma';

const createFaculty = async (facultyData: Faculty): Promise<Faculty> => {
  const result = await prisma.faculty.create({
    data: facultyData,

    // NOTE: Same as Mongoose Populate
    include: {
      academicFaculty: true,
      academicDepartment: true,
    },
  });

  return result;
};

export const FacultyService = {
  createFaculty,
};

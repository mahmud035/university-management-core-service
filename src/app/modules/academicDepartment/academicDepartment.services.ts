import { AcademicDepartment } from '@prisma/client';
import prisma from '../../../shared/prisma';

const createAcademicDepartment = async (
  academicDepartmentData: AcademicDepartment
): Promise<AcademicDepartment> => {
  const result = await prisma.academicDepartment.create({
    data: academicDepartmentData,
    // NOTE: Same as Mongoose Populate
    include: {
      academicFaculty: true,
    },
  });

  return result;
};

const getSingleAcademicDepartment = async (
  id: string
): Promise<AcademicDepartment | null> => {
  const result = await prisma.academicDepartment.findUnique({
    where: {
      id,
    },
    // NOTE: Same as Mongoose Populate
    include: {
      academicFaculty: true,
    },
  });

  return result;
};

export const AcademicDepartmentService = {
  createAcademicDepartment,
  getSingleAcademicDepartment,
};

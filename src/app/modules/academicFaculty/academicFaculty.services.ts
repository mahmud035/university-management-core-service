import { AcademicFaculty } from '@prisma/client';
import prisma from '../../../shared/prisma';

const createAcademicFaculty = async (
  academicFacultyData: AcademicFaculty
): Promise<AcademicFaculty> => {
  const result = await prisma.academicFaculty.create({
    data: academicFacultyData,
  });

  return result;
};

const getSingleAcademicFaculty = async (
  id: string
): Promise<AcademicFaculty | null> => {
  const result = await prisma.academicFaculty.findUnique({
    where: {
      id,
    },
  });
  return result;
};

export const AcademicFacultyService = {
  createAcademicFaculty,
  getSingleAcademicFaculty,
};

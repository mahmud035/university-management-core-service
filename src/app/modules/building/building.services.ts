/* eslint-disable @typescript-eslint/no-explicit-any */
import { Building, Prisma } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { buildingSearchableFields } from './building.constant';
import { IBuildingFilterRequest } from './building.interface';

const createBuilding = async (buildingData: Building): Promise<Building> => {
  const result = await prisma.building.create({
    data: buildingData,
  });

  return result;
};

const getAllBuilding = async (
  filters: IBuildingFilterRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<Building[]>> => {
  // Pagination
  const { page, limit, skip } = paginationHelpers.calculatePagination(options);

  // Only Searching (No Other Filter Data Included)
  const { searchTerm } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: buildingSearchableFields.map((field) => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

  const whereConditions: Prisma.BuildingWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.building.findMany({
    // Pagination
    skip,
    take: limit,

    // Searching
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

  const total = await prisma.building.count({
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

const getSingleBuilding = async (id: string): Promise<Building | null> => {
  const result = await prisma.building.findUnique({
    where: {
      id,
    },
  });

  return result;
};

const updateSingleBuilding = async (
  id: string,
  payload: Partial<Building>
): Promise<Building> => {
  const result = await prisma.building.update({
    where: {
      id,
    },
    // what to update
    data: payload,
  });

  return result;
};

const deleteSingleBuilding = async (id: string): Promise<Building> => {
  const result = await prisma.building.delete({
    where: {
      id,
    },
  });

  return result;
};

export const BuildingService = {
  createBuilding,
  getAllBuilding,
  getSingleBuilding,
  updateSingleBuilding,
  deleteSingleBuilding,
};

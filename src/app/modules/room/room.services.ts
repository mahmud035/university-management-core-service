/* eslint-disable @typescript-eslint/no-explicit-any */
import { Prisma, Room } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import {
  roomRelationalFields,
  roomRelationalFieldsMapper,
  roomSearchableFields,
} from './room.constant';
import { IRoomFilterRequest } from './room.interface';

const createRoom = async (roomData: Room): Promise<Room> => {
  const result = await prisma.room.create({
    data: roomData,
    // Populate
    include: {
      building: true,
    },
  });

  return result;
};

const getAllRoom = async (
  filters: IRoomFilterRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<Room[]>> => {
  // Pagination
  const { page, limit, skip } = paginationHelpers.calculatePagination(options);

  // Searching & Filtering
  const { searchTerm, ...filterData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: roomSearchableFields.map((field) => ({
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
        if (roomRelationalFields.includes(key)) {
          return {
            [roomRelationalFieldsMapper[key]]: {
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

  const whereConditions: Prisma.RoomWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.room.findMany({
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

    // Populate
    include: {
      building: true,
    },
  });

  const total = await prisma.room.count({
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

const getSingleRoom = async (id: string): Promise<Room | null> => {
  const result = await prisma.room.findUnique({
    where: {
      id,
    },
    // Populate
    include: {
      building: true,
    },
  });

  return result;
};

const updateRoom = async (
  id: string,
  payload: Partial<Room>
): Promise<Room> => {
  const result = await prisma.room.update({
    where: {
      id,
    },

    // what to update
    data: payload,

    // Populate
    include: {
      building: true,
    },
  });

  return result;
};

const deleteRoom = async (id: string): Promise<Room> => {
  const result = await prisma.room.delete({
    where: {
      id,
    },

    // Populate
    include: {
      building: true,
    },
  });

  return result;
};

export const RoomService = {
  createRoom,
  getAllRoom,
  getSingleRoom,
  updateRoom,
  deleteRoom,
};

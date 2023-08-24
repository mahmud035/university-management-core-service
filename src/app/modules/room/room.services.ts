import { Room } from '@prisma/client';
import prisma from '../../../shared/prisma';

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

export const RoomService = {
  createRoom,
  getSingleRoom,
};

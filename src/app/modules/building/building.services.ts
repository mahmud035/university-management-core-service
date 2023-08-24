import { Building } from '@prisma/client';
import prisma from '../../../shared/prisma';

const createBuilding = async (buildingData: Building): Promise<Building> => {
  const result = await prisma.building.create({
    data: buildingData,
  });

  return result;
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

export const BuildingService = {
  createBuilding,
  getSingleBuilding,
  updateSingleBuilding,
};

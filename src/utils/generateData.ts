import { faker } from "@faker-js/faker";
import { PAGE_SIZE, ROLES } from "./constants";

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
  location: [lat: number, lon: number];
  isActive: boolean;
}

export const generateFakeUsers = (count = PAGE_SIZE): User[] => {
  return Array.from({ length: count }, () => ({
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    email: faker.internet.email(),
    role: faker.helpers.arrayElement(ROLES),
    createdAt: faker.date.past({ years: 2 }).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }),
    location: generateRandomLocation(),
    isActive: Math.random() < 0.5,
  }));
};

export const generateRandomLocation = (): [lat: number, lon: number] => {
  return [
    Number(faker.location.latitude({ min: 36, max: 42 })),
    Number(faker.location.longitude({ min: 26, max: 45 })),
  ];
};

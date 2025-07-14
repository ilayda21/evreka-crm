import { faker } from "@faker-js/faker";

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
  location: [lat: number, lon: number];
}

export const generateFakeUsers = (count = 30): User[] => {
  return Array.from({ length: count }, () => ({
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    email: faker.internet.email(),
    role: faker.helpers.arrayElement(["admin", "user", "editor"]),
    createdAt: faker.date.past({ years: 2 }).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }),
    location: generateRandomLocation(),
  }));
};

export const generateRandomLocation = (): [lat: number, lon: number] => {
  return [
    Number(faker.location.latitude({ min: 36, max: 42 })),
    Number(faker.location.longitude({ min: 26, max: 45 })),
  ];
};

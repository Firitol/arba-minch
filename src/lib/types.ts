export type UserRole = 'mayor' | 'staff';

export type User = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
};

export type HouseHolder = {
  id: string;
  houseNumber: string;
  fullName: string;
  phone: string;
  familySize: number;
  kebele: string;
  latitude: number;
  longitude: number;
  createdAt: string; // ISO date string
};

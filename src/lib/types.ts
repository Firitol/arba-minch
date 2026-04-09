export type UserRole = 'mayor' | 'staff';

export interface UserProfile {
  uid: string;
  name: string;
  email: string;
  role: UserRole;
  photoURL?: string;
  createdAt: string; // ISO date string
}

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

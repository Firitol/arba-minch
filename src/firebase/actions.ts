'use client';

import {
  doc,
  setDoc,
  serverTimestamp,
  type Firestore,
} from 'firebase/firestore';
import type { User } from 'firebase/auth';

export async function createUserProfile(
  db: Firestore,
  user: User,
  additionalData: { name: string }
) {
  const userRef = doc(db, 'users', user.uid);
  const { name } = additionalData;
  const email = user.email;

  return setDoc(userRef, {
    name,
    email,
    role: 'staff', // Default role
    createdAt: serverTimestamp(),
  });
}

export async function updateUserProfile(
  db: Firestore,
  uid: string,
  data: { name: string }
) {
  const userRef = doc(db, 'users', uid);
  return setDoc(userRef, data, { merge: true });
}

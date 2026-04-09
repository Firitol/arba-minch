'use server';

import { getFirestore, doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { initializeFirebase } from '.';
import type { User } from 'firebase/auth';

initializeFirebase();
const db = getFirestore();

export async function createUserProfile(
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
  uid: string,
  data: { name: string }
) {
  const userRef = doc(db, 'users', uid);
  return setDoc(userRef, data, { merge: true });
}

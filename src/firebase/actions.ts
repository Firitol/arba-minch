'use client';

import {
  doc,
  setDoc,
  serverTimestamp,
  type Firestore,
} from 'firebase/firestore';
import type { User } from 'firebase/auth';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';

export function createUserProfile(
  db: Firestore,
  user: User,
  additionalData: { name: string }
) {
  const userRef = doc(db, 'users', user.uid);
  const { name } = additionalData;
  const email = user.email;
  const profileData = {
    name,
    email,
    role: 'staff', // Default role
    createdAt: serverTimestamp(),
  };

  return setDoc(userRef, profileData).catch((serverError) => {
    const permissionError = new FirestorePermissionError({
      path: userRef.path,
      operation: 'create',
      requestResourceData: profileData,
    });
    errorEmitter.emit('permission-error', permissionError);
    throw serverError;
  });
}

export function updateUserProfile(
  db: Firestore,
  uid: string,
  data: { name: string }
) {
  const userRef = doc(db, 'users', uid);
  return setDoc(userRef, data, { merge: true }).catch((serverError) => {
    const permissionError = new FirestorePermissionError({
      path: userRef.path,
      operation: 'update',
      requestResourceData: data,
    });
    errorEmitter.emit('permission-error', permissionError);
    throw serverError;
  });
}

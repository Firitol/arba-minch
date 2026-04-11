'use client';
import {
  collection,
  doc,
  addDoc,
  setDoc,
  deleteDoc,
  serverTimestamp,
  type Firestore,
} from 'firebase/firestore';
import type { HouseHolder } from '@/lib/types';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';

type HouseHolderData = Omit<HouseHolder, 'id' | 'createdAt'>;

export function addHouseHolder(db: Firestore, houseHolderData: HouseHolderData) {
  const householdersRef = collection(db, 'householders');
  const data = {
    ...houseHolderData,
    createdAt: serverTimestamp(),
  };

  return addDoc(householdersRef, data).catch((serverError) => {
    const permissionError = new FirestorePermissionError({
      path: householdersRef.path,
      operation: 'create',
      requestResourceData: data,
    });
    errorEmitter.emit('permission-error', permissionError);
    throw serverError;
  });
}

export function updateHouseHolder(
  db: Firestore,
  householderId: string,
  houseHolderData: Partial<HouseHolderData>
) {
  const householderRef = doc(db, 'householders', householderId);

  return setDoc(householderRef, houseHolderData, { merge: true }).catch(
    (serverError) => {
      const permissionError = new FirestorePermissionError({
        path: householderRef.path,
        operation: 'update',
        requestResourceData: houseHolderData,
      });
      errorEmitter.emit('permission-error', permissionError);
      throw serverError;
    }
  );
}

export function deleteHouseHolder(db: Firestore, householderId: string) {
  const householderRef = doc(db, 'householders', householderId);
  return deleteDoc(householderRef).catch((serverError) => {
    const permissionError = new FirestorePermissionError({
      path: householderRef.path,
      operation: 'delete',
    });
    errorEmitter.emit('permission-error', permissionError);
    throw serverError;
  });
}

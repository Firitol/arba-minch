import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';
import { firebaseConfig, isFirebaseEnabled } from './config';

import { FirebaseProvider, useFirebase, useFirebaseApp, useFirestore, useAuth } from './provider';
import { FirebaseClientProvider } from './client-provider';
import { useCollection } from './firestore/use-collection';
import { useDoc } from './firestore/use-doc';
import { UserProvider, useUser } from './auth/use-user';


let firebaseApp: FirebaseApp;
let auth: Auth;
let firestore: Firestore;

export function initializeFirebase() {
  if (isFirebaseEnabled && !getApps().length) {
    firebaseApp = initializeApp(firebaseConfig);
    auth = getAuth(firebaseApp);
    firestore = getFirestore(firebaseApp);
  } else if(isFirebaseEnabled) {
    firebaseApp = getApp();
    auth = getAuth(firebaseApp);
    firestore = getFirestore(firebaseApp);
  }

  return { firebaseApp, auth, firestore };
}

export {
  // Providers
  FirebaseProvider,
  FirebaseClientProvider,
  UserProvider,
  // Top-level hooks
  useUser,
  useCollection,
  useDoc,
  // Service-level hooks
  useFirebase,
  useFirebaseApp,
  useFirestore,
  useAuth,
};

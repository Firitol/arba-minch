import { initializeFirebase } from './init';

import { FirebaseProvider, useFirebase, useFirebaseApp, useFirestore, useAuth } from './provider';
import { FirebaseClientProvider } from './client-provider';
import { useCollection } from './firestore/use-collection';
import { useDoc } from './firestore/use-doc';
import { UserProvider, useUser } from './auth/use-user';

export {
  initializeFirebase,
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

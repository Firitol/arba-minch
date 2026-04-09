import { createContext, useContext } from 'react';
import { FirebaseApp } from 'firebase/app';
import { Auth } from 'firebase/auth';
import { Firestore } from 'firebase/firestore';

export interface FirebaseContextType {
  firebaseApp: FirebaseApp | null;
  auth: Auth | null;
  firestore: Firestore | null;
}

export const FirebaseContext = createContext<FirebaseContextType>({
  firebaseApp: null,
  auth: null,
  firestore: null,
});

export const FirebaseProvider = ({
  children,
  ...value
}: {
  children: React.ReactNode;
} & FirebaseContextType) => {
  return (
    <FirebaseContext.Provider value={value}>{children}</FirebaseContext.Provider>
  );
};

export const useFirebase = () => {
  return useContext(FirebaseContext);
};

export const useFirebaseApp = () => {
  return useContext(FirebaseContext)?.firebaseApp;
};

export const useFirestore = () => {
  return useContext(FirebaseContext)?.firestore;
};

export const useAuth = () => {
  return useContext(FirebaseContext)?.auth;
};

'use client';
import { useEffect, useState, createContext, useContext } from 'react';
import { onAuthStateChanged, type User } from 'firebase/auth';
import { useFirestore, useDoc, useAuth } from '@/firebase';
import { doc } from 'firebase/firestore';
import type { UserProfile } from '@/lib/types';
import { useMemoFirebase } from '../utils';

export interface UserContextType {
  user: (UserProfile & User) | null;
  loading: boolean;
}

const UserContext = createContext<UserContextType>({
  user: null,
  loading: true,
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const firestore = useFirestore();
  const auth = useAuth();

  useEffect(() => {
    if (!auth) {
      setLoading(false);
      return;
    }
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, [auth]);

  const userProfileRef = useMemoFirebase(
    () => (firestore && user ? doc(firestore, 'users', user.uid) : null),
    [firestore, user]
  );
  
  const { data: userProfile, loading: profileLoading } =
    useDoc<UserProfile>(userProfileRef);
  
  const enrichedUser = useMemoFirebase(
    () => (user && userProfile ? { ...user, ...userProfile } : null),
    [user, userProfile]
  );

  return (
    <UserContext.Provider
      value={{
        user: enrichedUser as (UserProfile & User) | null,
        loading: loading || profileLoading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);

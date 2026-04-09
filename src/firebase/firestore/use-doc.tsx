'use client';
import { useState, useEffect } from 'react';
import {
  doc,
  onSnapshot,
  getDoc,
  DocumentReference,
  FirestoreError,
} from 'firebase/firestore';
import { useFirestore } from '@/firebase';
import { errorEmitter } from '../error-emitter';
import { FirestorePermissionError } from '../errors';

export const useDoc = <T,>(
  ref: DocumentReference | null,
  { listen } = { listen: true }
) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<FirestoreError | null>(null);
  const firestore = useFirestore();

  useEffect(() => {
    if (!firestore || !ref) {
      setLoading(false);
      return;
    }
    setLoading(true);

    if (!listen) {
      getDoc(ref)
        .then((snapshot) => {
          if (snapshot.exists()) {
            setData({ ...snapshot.data(), id: snapshot.id } as T);
          } else {
            setData(null);
          }
          setLoading(false);
        })
        .catch((err) => {
          setError(err);
          setLoading(false);
          const permissionError = new FirestorePermissionError({
            path: ref.path,
            operation: 'get',
          });
          errorEmitter.emit('permission-error', permissionError);
        });
      return;
    }

    const unsubscribe = onSnapshot(
      ref,
      (snapshot) => {
        if (snapshot.exists()) {
          setData({ ...snapshot.data(), id: snapshot.id } as T);
        } else {
          setData(null);
        }
        setLoading(false);
        setError(null);
      },
      (err) => {
        setError(err);
        setLoading(false);
        const permissionError = new FirestorePermissionError({
          path: ref.path,
          operation: 'get',
        });
        errorEmitter.emit('permission-error', permissionError);
      }
    );

    return () => unsubscribe();
  }, [firestore, ref, listen]);

  return { data, loading, error };
};

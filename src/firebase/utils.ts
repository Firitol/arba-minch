import { useMemo } from 'react';

export const useMemoFirebase = <T>(
  factory: () => T,
  deps: React.DependencyList | undefined
) => {
  return useMemo(factory, deps);
};

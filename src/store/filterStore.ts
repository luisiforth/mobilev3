import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { zustandStorage } from './MMKV';
import {
  StorageCredentialsProps,
  StorageDefectsProps,
  StorageFilterProps,
} from './types';

export const useFilterStore = create<StorageFilterProps>()(
  persist(
    (set) => ({
      filters: null,
      setFilter: (filter) =>
        set((state) => ({
          filters: { ...state.filters, ...filter },
        })),
    }),
    {
      name: 'filter-storage',
      storage: createJSONStorage(() => zustandStorage),
    }
  )
);

export const useCredentialStore = create<StorageCredentialsProps>()(
  persist(
    (set) => ({
      credential: null,
      setUser: (credential) =>
        set((state) => {
          return { credential: { ...state.credential, ...credential } };
        }),
    }),
    {
      name: 'credential-storage',
      storage: createJSONStorage(() => zustandStorage),
    }
  )
);

export const useDefectsStore = create<StorageDefectsProps>()(
  persist(
    (set) => ({
      defects: [],
      setDefect: (defects: []) =>
        set(() => ({
          defects: defects,
        })),
    }),
    {
      name: 'defects-storage',
      storage: createJSONStorage(() => zustandStorage),
    }
  )
);

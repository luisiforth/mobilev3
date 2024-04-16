import { ReactNode, createContext, useEffect, useState } from 'react';
import { Alert } from 'react-native';

import { useProtectedRouter } from '@/hooks/useProtectedRouter';
import {
  useCredentialStore,
  useFilterStore,
  useTimeStore,
  useTokenStore,
} from '@/store/filterStore';
import axios from 'axios';
import { encode } from 'js-base64';
import { api } from 'util/axios/axios';

import { getToken } from './api-urls';

type AuthContextData = {
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => void;
};

export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData
);

type AuthProviderProps = {
  children: ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const { token, setToken, setDeleteToken } = useTokenStore();
  const { time, setTime, setDeleteTime } = useTimeStore();
  const { setUser } = useCredentialStore();
  const { setFilter } = useFilterStore();
  useProtectedRouter(token);

  function updateToken(token: string) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
    setToken(token);
  }

  useEffect(() => {
    updateToken(token!);
  }, [token]);

  async function signIn(user: string, password: string) {
    const login_encoded = encode(
      `${user.toLowerCase()}|${password.toLowerCase()}`
    );
    try {
      const request = await api.get(getToken(), {
        headers: { iforthsistemas: `iforth ${login_encoded}` },
      });
      console.log(request.data);
      updateToken(request.data.SESSAO.TOKEN);
      setToken(request.data.SESSAO.TOKEN);

      const data = {
        userid: request.data.ID,
        username: request.data.NOME,
      };

      setUser(data);
      return;
    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        return Alert.alert('', `Usuário ou senha inválidos!2`);
      }

      Alert.alert('', `Usuário ou senha inválidos!`);
      throw error;
    }
  }

  function signOut() {
    setDeleteToken();
    setFilter({ line: null, unit: null });
    setUser({ userid: null, username: null });
  }

  // function useTokenExpiration() {
  //   if (!time) return;
  //   const timeToken = new Date(time).getTime() / 1000;
  //   const actualDate = new Date().getTime() / 1000;
  //   // console.log(timeToken >= actualDate);
  //   if (timeToken >= actualDate) return signOut();
  // }

  api.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response.status === 401) {
        signOut();
      }
      return error;
    }
  );

  return (
    <AuthContext.Provider value={{ signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

import { ReactNode, createContext, useState } from 'react';
import { Alert } from 'react-native';

import { useProtectedRouter } from '@/hooks/useProtectedRouter';
import { useCredentialStore } from '@/store/filterStore';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { encode } from 'js-base64';
import { api } from 'util/axios/axios';

import { getToken } from './api-urls';

type AuthContextData = {
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData
);

type AuthProviderProps = {
  children: ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [userToken, setUserToken] = useState('');
  useProtectedRouter(userToken);
  const { setUser } = useCredentialStore();

  function updateToken(token: string) {
    setUserToken(token);
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
  }

  async function signIn(user: string, password: string) {
    const login_encoded = encode(
      `${user.toLowerCase()}|${password.toLowerCase()}`
    );
    try {
      const request = await api.get(getToken(), {
        headers: { iforthsistemas: `iforth ${login_encoded}` },
      });

      updateToken(request.data.TOKEN);
      await SecureStore.setItemAsync('iforthToken', request.data.TOKEN);

      const data = {
        userid: request.data.IDUSU,
        username: request.data.NOMEUSU,
      };

      setUser(data);
      return;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        Alert.alert('', `Usuário ou senha inválidos`);
        console.log(error.toJSON());
      }

      Alert.alert('', `Usuário ou senha inválidos`);

      throw error;
    }
  }

  async function signOut() {
    await SecureStore.deleteItemAsync('iforthToken');
    setUserToken('');
    setUser({ userid: null, username: null });
  }

  return (
    <AuthContext.Provider value={{ signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

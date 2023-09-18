import React, { createContext, useContext, useEffect, useState } from 'react';

import NetInfo from '@react-native-community/netinfo';

interface NetInfoContextType {
  isConnected: boolean | null;
}

type ProviderProps = {
  children: React.ReactNode;
};

const NetInfoContext = createContext<NetInfoContextType | undefined>(undefined);

export const NetInfoProvider = ({ children }: ProviderProps) => {
  const [isConnected, setIsConnected] = useState<boolean | null>(null);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <NetInfoContext.Provider value={{ isConnected }}>
      {children}
    </NetInfoContext.Provider>
  );
};

export const useNetInfo = (): NetInfoContextType => {
  const context = useContext(NetInfoContext);
  if (context === undefined) {
    throw new Error('useNetInfo must be used within a NetInfoProvider');
  }
  return context;
};

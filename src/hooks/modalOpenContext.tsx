import React, { createContext, useContext, useState } from 'react';

interface ModalContextType {
  isModalOpen: boolean;
  toggleModal: () => void;
}

// Criação do contexto
const ModalContext = createContext<ModalContextType | undefined>(undefined);

// Hook para usar o contexto
export const useModalContext = () => {
  const context = useContext(ModalContext);

  if (!context) {
    throw new Error('useModalContext must be used within a ModalProvider');
  }

  return context;
};

// Props para o ModalProvider
interface ModalProviderProps {
  children: React.ReactNode;
}

// Componente ModalProvider
export const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const contextValue: ModalContextType = {
    isModalOpen,
    toggleModal,
  };

  return (
    <ModalContext.Provider value={contextValue}>
      {children}
    </ModalContext.Provider>
  );
};

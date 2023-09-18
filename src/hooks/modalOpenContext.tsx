import React, { createContext, useContext, useState } from 'react';
import { View } from 'react-native';
import Modal from 'react-native-modal/dist/modal';

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

// Componente do modal
export function CustomModal({ children }: { children: React.ReactNode }) {
  const { isModalOpen, toggleModal } = useModalContext();

  return (
    <Modal
      isVisible={isModalOpen}
      onSwipeComplete={toggleModal}
      backdropColor="#2E2F42"
      backdropOpacity={0.8}
      swipeDirection={['down']}
      style={{
        justifyContent: 'flex-end',
        margin: 0,
      }}
    >
      {children}
    </Modal>
  );
}

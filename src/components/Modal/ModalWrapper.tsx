import Modal from 'react-native-modal/dist/modal';

import { useModalContext } from '@/hooks/modalOpenContext';

import * as S from './styles';

export function CustomModal({ children }: { children: React.ReactNode }) {
  const { isModalOpen, toggleModal } = useModalContext();
  return (
    <>
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
        <S.Root.Wrapper>{children}</S.Root.Wrapper>
      </Modal>
    </>
  );
}

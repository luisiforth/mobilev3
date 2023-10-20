import { PanResponderGestureState } from 'react-native';
import Modal, { OnSwipeCompleteParams } from 'react-native-modal/dist/modal';

type ModalCustomProps = {
  children: React.ReactNode;
  isVisible: boolean;
  onBackdropPress: () => void;
  onSwipeComplete: (
    params: OnSwipeCompleteParams,
    gestureState: PanResponderGestureState
  ) => void;
};

export function CustomModalImage({
  children,
  onBackdropPress,
  isVisible,
  onSwipeComplete,
}: ModalCustomProps) {
  return (
    <Modal
      swipeDirection={['down', 'left', 'right', 'up']}
      style={{
        // justifyContent: 'center',
        margin: 0,
      }}
      onSwipeComplete={onSwipeComplete}
      isVisible={isVisible}
      onBackdropPress={onBackdropPress}
      backdropColor="#2E2F42"
      backdropOpacity={0.8}
    >
      {children}
    </Modal>
  );
}

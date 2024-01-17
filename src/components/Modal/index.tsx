import {
  ForwardRefRenderFunction,
  ReactNode,
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
} from 'react';

import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProps,
} from '@gorhom/bottom-sheet';
import { useTheme } from 'styled-components/native';

export type ComportModalProps = {
  handlePresentModalPress: () => void;
  handleForceClose: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleRenderBackDrop: (props: any) => React.JSX.Element;
  handleClose: () => void;
  handleDismiss: () => void;
};

type ModalProps = {
  children: ReactNode;
  snapPoints?: string[];
} & BottomSheetModalProps;

const Modal: ForwardRefRenderFunction<ComportModalProps, ModalProps> = (
  { children, snapPoints = ['24%', '60%'], ...props },
  ref
) => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const theme = useTheme();

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleRenderBackDrop = useCallback((props: any) => {
    return (
      <BottomSheetBackdrop
        appearsOnIndex={3}
        disappearsOnIndex={-1}
        {...props}
      />
    );
  }, []);

  const handleDismiss = useCallback(() => {
    bottomSheetModalRef.current?.dismiss();
  }, []);

  const handleForceClose = useCallback(() => {
    bottomSheetModalRef.current?.forceClose();
  }, []);

  const handleClose = useCallback(() => {
    // console.log('AQUi ?')
    bottomSheetModalRef.current?.close;
  }, []);

  useImperativeHandle(ref, () => {
    return {
      handleClose,
      handleDismiss,
      handleForceClose,
      handlePresentModalPress,
      handleRenderBackDrop,
    };
  });

  return (
    <BottomSheetModal
      handleIndicatorStyle={{
        backgroundColor: theme.colors.gray['400'],
      }}
      {...props}
      ref={bottomSheetModalRef}
      backdropComponent={handleRenderBackDrop}
      snapPoints={snapPoints}
    >
      {children}
    </BottomSheetModal>
  );
};

export default forwardRef(Modal);

import {
  ForwardRefRenderFunction,
  ReactNode,
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
} from 'react';

import { BottomSheetBackdrop, BottomSheetModal } from '@gorhom/bottom-sheet';

export type ComportModalProps = {
  handlePresentModalPress: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleRenderBackDrop: (props: any) => React.JSX.Element;
  handleClose: () => void;
  handleDismiss: () => void;
};

type ModalProps = {
  children: ReactNode;
  snapPoints?: string[];
};

const Modal: ForwardRefRenderFunction<ComportModalProps, ModalProps> = (
  { children, snapPoints = ['24%', '60%'] },
  ref
) => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleRenderBackDrop = useCallback((props: any) => {
    return <BottomSheetBackdrop {...props} />;
  }, []);

  const handleDismiss = useCallback(() => {
    bottomSheetModalRef.current?.dismiss();
  }, []);

  const handleClose = useCallback(() => {
    // console.log('AQUi ?')
    bottomSheetModalRef.current?.close;
  }, []);

  useImperativeHandle(ref, () => {
    return {
      handleClose,
      handleDismiss,
      handlePresentModalPress,
      handleRenderBackDrop,
    };
  });

  return (
    <BottomSheetModal
      ref={bottomSheetModalRef}
      index={1}
      backdropComponent={handleRenderBackDrop}
      snapPoints={snapPoints}
      enablePanDownToClose={true}
    >
      {children}
    </BottomSheetModal>
  );
};

export default forwardRef(Modal);

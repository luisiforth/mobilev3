import { useCallback, useMemo, useRef, useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { TouchableOpacity } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';

import CameraCustom2 from '@/components/Camera/camera';
import { CameraPreview } from '@/components/CameraPreview';
// import { ModalCustom } from '@/components/Modal';
import Modal, { ComportModalProps } from '@/components/Modal';
import { useOnRequired } from '@/hooks/useOnRequired';
import { Feather } from '@expo/vector-icons';

import * as S from '@/screens/advanced-piece/styles';

interface StepProps {
  methods: UseFormReturn;
  onRequired: (value?: unknown) => boolean;
}

export const StepCamera = ({ methods, onRequired }: StepProps) => {
  const image = methods.getValues().images;
  const bottomSheetModalRef = useRef<ComportModalProps>(null);
  const snapPoints = useMemo(() => ['40%', '95%'], []);

  useOnRequired(['images'], {
    methods,
    onRequired,
  });

  const handleRemoveArrayImage = useCallback(
    (value: string) => {
      methods.setValue(
        'images',
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        image.filter((element: any) => element !== value)
      );
      return;
    },
    [image, methods]
  );

  return (
    <S.Root.WrapperSteps>
      {image?.length > 0 ? (
        <Carousel
          width={283}
          height={450}
          mode="parallax"
          style={{
            alignContent: 'center',
            justifyContent: 'center',
            width: '100%',
          }}
          autoPlay={image.length > 1}
          enabled={image.length > 1}
          data={image}
          renderItem={({ item }) => {
            return (
              <>
                <TouchableOpacity activeOpacity={1} hitSlop={500}>
                  <CameraPreview.Icon
                    icon="x"
                    hitSlop={20}
                    onPress={() => handleRemoveArrayImage(item as string)}
                  />
                  <CameraPreview.Content image={item as string} />
                </TouchableOpacity>
              </>
            );
          }}
        />
      ) : (
        <CameraPreview.Wrapper>
          <Feather
            name={'camera'}
            style={{ padding: 60 }}
            size={35}
            onPress={() =>
              bottomSheetModalRef.current?.handlePresentModalPress()
            }
            color={'black'}
          />
        </CameraPreview.Wrapper>
      )}

      <Modal snapPoints={snapPoints} ref={bottomSheetModalRef}>
        <Feather
          name="x"
          onPress={() => bottomSheetModalRef.current?.handleDismiss()}
          size={30}
          color={'black'}
        />
        <CameraCustom2
          setValue={methods.setValue}
          closeModal={() => bottomSheetModalRef.current?.handleDismiss()}
        />
      </Modal>
    </S.Root.WrapperSteps>
  );
};

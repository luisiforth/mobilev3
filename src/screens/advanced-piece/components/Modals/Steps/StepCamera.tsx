import { useCallback, useMemo, useRef, useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { TouchableOpacity } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';

import MemoizedCameraCustom2 from '@/components/Camera/camera';
import { CameraPreview } from '@/components/CameraPreview';
import Loading from '@/components/Loading';
import Modal, { ComportModalProps } from '@/components/Modal';
import { useOnRequired } from '@/hooks/useOnRequired';
import { Feather } from '@expo/vector-icons';
import { ReactNativeZoomableView } from '@openspacelabs/react-native-zoomable-view';
import { Image } from 'expo-image';

import * as S from '@/screens/advanced-piece/styles';

interface StepProps {
  methods: UseFormReturn;
  onRequired: (value?: unknown) => boolean;
}

export const StepCamera = ({ methods, onRequired }: StepProps) => {
  const image = methods.getValues().images;
  const [imageZoom, setImageZoom] = useState('');
  const bottomSheetModalRef = useRef<ComportModalProps>(null);
  const bottomSheetModalRef2 = useRef<ComportModalProps>(null);
  const snapPoints = useMemo(() => ['90%', '95%'], []);
  const snapPoints2 = useMemo(() => ['70%', '85%'], []);
  const [showSpinner, setShowSpinner] = useState(false);

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
  const handleImageZoom = useCallback(
    (value: string) => {
      setImageZoom(value);

      return bottomSheetModalRef2.current?.handlePresentModalPress();
    },
    [imageZoom]
  );
  const handleOpen = useCallback(() => {
    setTimeout(() => {
      setShowSpinner(false);
    }, 1000);
    setShowSpinner(true);
    bottomSheetModalRef.current?.handlePresentModalPress();
  }, []);

  return (
    <S.Root.WrapperSteps>
      {image?.length > 0 ? (
        image.length == 1 ? (
          <>
            <Feather
              name={'camera'}
              style={{ alignSelf: 'flex-end', marginRight: 10 }}
              size={25}
              onPress={handleOpen}
              color={'black'}
            />

            <TouchableOpacity
              style={{
                alignItems: 'center',
                padding: 10,
                justifyContent: 'center',
              }}
              onPress={() => handleImageZoom(image[0])}
              activeOpacity={1}
            >
              <CameraPreview.Icon
                icon="x"
                hitSlop={20}
                onPress={() => handleRemoveArrayImage(image[0] as string)}
              />
              <CameraPreview.Content image={image[0] as string} />
            </TouchableOpacity>
          </>
        ) : (
          <>
            {image.length < 3 && (
              <Feather
                name={'camera'}
                style={{ alignSelf: 'flex-end', marginRight: 10 }}
                size={25}
                onPress={handleOpen}
                color={'black'}
              />
            )}
            <Carousel
              width={283}
              height={400}
              mode="parallax"
              style={{
                alignContent: 'center',
                justifyContent: 'center',
                width: '100%',
              }}
              data={image}
              renderItem={({ item }) => {
                return (
                  <>
                    <TouchableOpacity
                      activeOpacity={1}
                      onPress={() => handleImageZoom(item as string)}
                    >
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
          </>
        )
      ) : (
        <CameraPreview.Wrapper>
          <Feather
            name={'camera'}
            style={{ padding: 60 }}
            size={35}
            onPress={handleOpen}
            color={'black'}
          />
        </CameraPreview.Wrapper>
      )}

      <Modal snapPoints={snapPoints2} ref={bottomSheetModalRef2}>
        <ReactNativeZoomableView
          style={{
            flex: 1,
          }}
        >
          <Image
            style={{ width: '100%', height: '100%' }}
            source={{ uri: 'data:image/jpg;base64,' + imageZoom }}
            contentFit="cover"
          />
        </ReactNativeZoomableView>
      </Modal>

      <Modal snapPoints={snapPoints} ref={bottomSheetModalRef}>
        <Feather
          name="x"
          onPress={() => bottomSheetModalRef.current?.handleDismiss()}
          size={30}
          color={'black'}
        />
        {showSpinner ? (
          <Loading />
        ) : (
          <MemoizedCameraCustom2
            setValue={methods.setValue}
            arrayImage={image}
            closeModal={() => bottomSheetModalRef.current?.handleDismiss()}
          />
        )}
      </Modal>
    </S.Root.WrapperSteps>
  );
};

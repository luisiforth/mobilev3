import { useEffect, useRef, useState } from 'react';
import { useCallback } from 'react';
import React from 'react';
import { Alert, View } from 'react-native';

import { Feather } from '@expo/vector-icons';
import { Camera, CameraType, ImageType } from 'expo-camera';

import { handleFlashMode } from './handle-flash';
import { toggleCameraType } from './handle-flipcam';

import * as S from './styles';

type CameraProps = {
  setValue: (key: string, value: string[] | string | undefined) => void;
  closeModal: () => void;
  arrayImage: string[] | string;
};

const MemoizedCameraCustom2 = React.memo(function CameraCustom2({
  setValue,
  closeModal,
  arrayImage,
}: CameraProps) {
  const cameraRef = useRef<Camera>(null);
  const [images, setImages] = useState<string[] | string>(arrayImage || []);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [type, setType] = useState(CameraType.back);
  const [flashMode, setFlashMode] = useState(0);
  const [zoom, setZoom] = useState(0);

  const handleZoomChange = () => {
    if (zoom >= 0 && zoom <= 0.9) setZoom((prev) => prev + 0.1);
  };

  const handleMinusZoomChange = () => {
    if (zoom >= 0.1 && zoom <= 1) setZoom((prev) => prev - 0.1);
  };

  const takePicture = useCallback(async () => {
    const photo = await cameraRef.current?.takePictureAsync({
      base64: true,
      imageType: ImageType.jpg,
      quality: 0,
      scale: 500,
      skipProcessing: true,
    });

    if (images.length === 2) {
      return closeModal();
    }

    if (photo) {
      setImages((prevImages) => [...prevImages, photo.base64] as string[]);
      if (images.length === 2) {
        return closeModal();
      }
    }
    return Alert.alert('Aviso', 'Deseja continuar batendo foto?', [
      {
        text: 'Sim',
      },
      {
        onPress: () => closeModal(),
        style: 'cancel',
        text: 'Não',
      },
    ]);
  }, [images]);

  useEffect(() => {
    setValue('images', images);
  }, [images]);

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    Alert.alert(
      'Permissão da câmera',
      'Permita o uso da camera no aplicativo ?',
      [
        {
          onPress: requestPermission,
          text: 'Sim',
        },
        {
          style: 'cancel',
          text: 'Não',
        },
      ]
    );
  }

  return (
    <>
      <S.Root.CameraStyled
        ref={cameraRef}
        ratio={'16:9'}
        zoom={parseFloat(zoom.toFixed(2))}
        type={type}
        flashMode={flashMode}
      >
        <S.Root.WrapperOptionsCam>
          <Feather
            name={`${type != 'back' ? 'refresh-cw' : 'refresh-ccw'}`}
            onPress={() => toggleCameraType(setType)}
            size={25}
            color={'white'}
          />
          <Feather
            name="sun"
            onPress={() => handleFlashMode(setFlashMode)}
            size={25}
            color={`${flashMode ? 'yellow' : 'white'}`}
          />
          <Feather
            name="plus"
            onPress={() => handleFlashMode(handleZoomChange)}
            size={25}
            color={'white'}
          />
          <Feather
            name="minus"
            onPress={() => handleFlashMode(handleMinusZoomChange)}
            size={25}
            color={'white'}
          />
        </S.Root.WrapperOptionsCam>
        <S.Root.Circle onPress={takePicture} />
      </S.Root.CameraStyled>
    </>
  );
});

export default MemoizedCameraCustom2;

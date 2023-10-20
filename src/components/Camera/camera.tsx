import { useEffect, useRef, useState } from 'react';
import { Alert, View } from 'react-native';

import { Feather } from '@expo/vector-icons';
import { Camera, CameraType, ImageType } from 'expo-camera';

import { handleFlashMode } from './handle-flash';
import { toggleCameraType } from './handle-flipcam';

import * as S from './styles';

type CameraProps = {
  setValue: (key: string, value: string[] | string | undefined) => void;
  closeModal: () => void;
};

export default function CameraCustom2({ setValue, closeModal }: CameraProps) {
  const cameraRef = useRef<Camera>(null);
  const [images, setImages] = useState<string[]>([]);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [type, setType] = useState(CameraType.back);
  const [flashMode, setFlashMode] = useState(0);

  const takePicture = async () => {
    const photo = await cameraRef.current?.takePictureAsync({
      base64: true,
      imageType: ImageType.jpg,
      quality: 0,
      scale: 500,
      skipProcessing: true,
    });

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
  };

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
        </S.Root.WrapperOptionsCam>
        <S.Root.Circle onPress={takePicture} />
      </S.Root.CameraStyled>
    </>
  );
}

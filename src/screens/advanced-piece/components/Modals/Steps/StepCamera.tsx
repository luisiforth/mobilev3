import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import {
  Button,
  Dimensions,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { StyleSheet } from 'react-native';
import { Alert } from 'react-native';
import Animated, {
  useSharedValue,
  withSpring,
  useAnimatedStyle,
} from 'react-native-reanimated';

import Modal, { ComportModalProps } from '@/components/Modal';
import { useOnRequired } from '@/hooks/useOnRequired';
import ImageResizer from '@bam.tech/react-native-image-resizer';
import { Feather } from '@expo/vector-icons';
import { ReactNativeZoomableView } from '@openspacelabs/react-native-zoomable-view';
import { Image } from 'expo-image';
import * as ImagePicker from 'expo-image-picker';
import { useTheme } from 'styled-components/native';

import * as S from '@/screens/advanced-piece/styles';

interface StepProps {
  methods: UseFormReturn;
  onRequired: (value?: unknown) => boolean;
}
const { width } = Dimensions.get('window');

export const StepCamera = ({ methods, onRequired }: StepProps) => {
  const [image, setImage] = useState<string[]>(
    methods.getValues('images') || []
  );

  const [imageZoom, setImageZoom] = useState('');
  const [permission, requestPermission] = ImagePicker.useCameraPermissions();

  const bottomSheetModalRef = useRef<ComportModalProps>(null);
  const AnimatedTouchableOpacity =
    Animated.createAnimatedComponent(TouchableOpacity);
  const theme = useTheme();
  const translateY = useSharedValue(100);
  translateY.value = withSpring(0);
  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));
  const snapPoints = useMemo(() => ['80%', '80%'], []);

  useOnRequired(['images'], {
    methods,
    onRequired,
  });

  const handleRemoveArrayImage = useCallback(
    (value: string) => {
      // const newArray =
      setImage(image.filter((element: string) => element !== value));
      methods.setValue(
        'images',
        image.filter((element: string) => element !== value)
      );
      return;
    },
    [image, methods]
  );

  const handleImageZoom = useCallback(
    (value: string) => {
      setImageZoom(value);

      return bottomSheetModalRef.current?.handlePresentModalPress();
    },
    [imageZoom]
  );

  const handleOpenCamera = useCallback(async () => {
    if (image && image?.length === 3) return;
    translateY.value = withSpring(0);
    const camera = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    methods.setValue('images', image);

    if (!camera.canceled) {
      const compressedImage = await ImageResizer.createResizedImage(
        camera.assets[0].uri,
        1000, // width
        1500, // height
        'JPEG', // format
        90 // quality
      );
      if (compressedImage.size > 500000)
        return Alert.alert(
          'A Imagem excedeu o limite de tamanho!',
          'Favor diminuir o tamanho nas configurações do aparelhou ou entrar em contato com o administrador.'
        );
      setImage((prev) => [...prev, compressedImage.uri]);
    }
  }, [image]);

  useEffect(() => {
    setTimeout(() => methods.setValue('images', image), 0);
    if (image.length == 3) translateY.value = withSpring(100);
  }, [image]);

  if (permission?.status !== ImagePicker.PermissionStatus.GRANTED) {
    return <Button title="Dar permissão" onPress={requestPermission} />;
  }

  return (
    <S.Root.WrapperSteps>
      {image.length != 3 && (
        <AnimatedTouchableOpacity
          activeOpacity={0.8}
          onPress={handleOpenCamera}
          style={[style.wrapperIconImage, animatedStyles]}
        >
          <Feather name="camera" size={30} color={theme.colors.primary[300]} />
          <Text style={style.textCamera}> Abrir a câmera </Text>
        </AnimatedTouchableOpacity>
      )}
      {image && (
        <FlatList
          data={image}
          // horizontal
          numColumns={2}
          columnWrapperStyle={{
            gap: 20,
          }}
          ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
          centerContent
          renderItem={({ index, item }) => {
            return (
              <View>
                <TouchableOpacity
                  style={{
                    alignItems: 'center',
                    backgroundColor: 'white',
                    borderRadius: 999,
                    elevation: 15,
                    height: 30,
                    justifyContent: 'center',
                    position: 'absolute',
                    right: 5,
                    top: 5,
                    width: 30,
                    zIndex: 2,
                  }}
                  onPress={() => handleRemoveArrayImage(item)}
                >
                  <Feather name={'trash-2'} size={20} color={'red'} />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleImageZoom(item)}
                  activeOpacity={0.9}
                >
                  <Image
                    source={item}
                    key={index}
                    style={{
                      borderRadius: 6,
                      height: width * 0.4,
                      width: width * 0.4,
                    }}
                  />
                </TouchableOpacity>
              </View>
            );
          }}
        />
      )}

      <Modal
        ref={bottomSheetModalRef}
        enablePanDownToClose={false}
        snapPoints={snapPoints}
        handleIndicatorStyle={{
          backgroundColor: theme.colors.white[500],
        }}
      >
        <>
          <Feather
            name="x"
            size={35}
            onPress={() => bottomSheetModalRef.current?.handleDismiss()}
            style={{ alignSelf: 'flex-end', marginRight: 20 }}
          />
          <Text style={{ textAlign: 'center', color: theme.colors.gray[500] }}>
            Arraste para ampliar a imagem.
          </Text>
          <ReactNativeZoomableView
            style={{
              flex: 1,
            }}
            maxZoom={2}
          >
            <Image
              source={imageZoom}
              style={{
                height: width,
                width: width,
              }}
            />
          </ReactNativeZoomableView>
        </>
      </Modal>
    </S.Root.WrapperSteps>
  );
};

const style = StyleSheet.create({
  textCamera: {
    backgroundColor: '#7474B7',
    borderRadius: 6,
    color: 'white',
    padding: 6,
  },
  wrapperIconImage: {
    alignItems: 'center',
    borderColor: '#505086',
    borderRadius: 6,
    borderStyle: 'dashed',
    borderWidth: 2,
    gap: 6,
    height: width * 0.35,
    justifyContent: 'center',
  },
});

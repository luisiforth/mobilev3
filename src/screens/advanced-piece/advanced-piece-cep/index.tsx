import { useCallback, useState } from 'react';
import { ActivityIndicator, ScrollView } from 'react-native';
import { Text, View } from 'react-native';
// import { TouchableOpacity } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';

import { TextInput } from '@/components/TextInput';
// eslint-disable-next-line import-helpers/order-imports
import { Feather } from '@expo/vector-icons';
// import { GenerateAdvancedPieceProps } from 'util/realm/schema/historic_advanced_piece';

import { GenerateAdvancedPieceProps } from 'util/realm/schema/historic_advanced_piece';

import { CustomModalImage } from './CustomModalImage';

import * as S from './styles';

export type ItemProps = {
  BRILHO: number;
  IMAGEM: string[];
  TOM: number;
  TONALIDADE: number;
  TEXTURA: number;
  DEFEITO: {
    DESCRICAO: string;
  };
  OBSERVACAO: string;
  DEFORMADO: number;
  DIFTON: number;
};

type CepLayoutProps = {
  data: ItemProps & GenerateAdvancedPieceProps;
};

export default function AdvancedPieceCepLayout({ data }: CepLayoutProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [image, setImage] = useState('');

  const handleOpenModal = useCallback(() => {
    setModalOpen(!modalOpen);
  }, [modalOpen]);

  const handleClickImage = useCallback(
    (item: string) => {
      handleOpenModal();
      setImage(item);
    },
    [modalOpen]
  );

  function isConformed(value: number) {
    return value === 0 ? 'Conforme' : 'Não conforme';
  }

  return (
    <>
      {!data ? (
        <ActivityIndicator />
      ) : (
        <>
          <ScrollView
            style={{
              flex: 1,
              zIndex: 99999,
            }}
          >
            <S.Root.Wrapper activeOpacity={1}>
              {data.IMAGEM.length > 1 ? (
                <Carousel
                  width={300}
                  height={380}
                  data={data.IMAGEM}
                  mode="parallax"
                  renderItem={({ item }) => {
                    return (
                      <>
                        <S.Root.Touchable
                          onPress={() => handleClickImage(item)}
                          activeOpacity={0.9}
                        >
                          <S.Root.ImageContent
                            source={{ uri: 'data:image/jpg;base64,' + item }}
                          />
                        </S.Root.Touchable>
                      </>
                    );
                  }}
                />
              ) : (
                <View
                  style={{
                    height: 350,
                    width: 300,
                  }}
                >
                  <S.Root.Touchable
                    onPress={() => handleClickImage(data.IMAGEM[0])}
                    activeOpacity={0.9}
                  >
                    <S.Root.ImageContent
                      style={{
                        height: 350,
                      }}
                      source={{
                        uri: 'data:image/jpg;base64,' + data.IMAGEM[0],
                      }}
                    />
                  </S.Root.Touchable>
                </View>
              )}
              <Text>* Toque para ampliar</Text>
              <TextInput.Wrapper label="Tom">
                <TextInput.Content
                  editable={false}
                  value={
                    data.TOM?.toString() || data.TOMCEPPECAADIANTADA?.toString()
                  }
                />
              </TextInput.Wrapper>
              <TextInput.Wrapper label="Tonalidade">
                <TextInput.Content
                  focusable={false}
                  editable={false}
                  value={isConformed(
                    data.TONALIDADE || data.TONCEPPECAADIANTADA
                  )}
                />
              </TextInput.Wrapper>
              <TextInput.Wrapper label="Textura">
                <TextInput.Content
                  editable={false}
                  value={isConformed(
                    data.TEXTURA || data.TEXTURACEPPECAADIANTADA
                  )}
                />
              </TextInput.Wrapper>
              <TextInput.Wrapper label="Brilho">
                <TextInput.Content
                  editable={false}
                  value={isConformed(
                    data.BRILHO || data.BRILHOCEPPECAADIANTADA
                  )}
                />
              </TextInput.Wrapper>
              <TextInput.Wrapper label="Defeito">
                <TextInput.Content
                  editable={false}
                  value={data.DEFEITO?.DESCRICAO || data.DESCDEFEITO}
                />
              </TextInput.Wrapper>
              <TextInput.Wrapper label="Observação do Defeito">
                <TextInput.Content
                  editable={false}
                  value={data.OBSERVACAO || data.OBSCEPPECAADIANTADA}
                />
              </TextInput.Wrapper>
              <TextInput.Wrapper label="Deformado">
                <TextInput.Content
                  editable={false}
                  value={isConformed(
                    data.DEFORMADO || data.DEFORMADOCEPPECAADIANTADA
                  )}
                />
              </TextInput.Wrapper>
              <TextInput.Wrapper label="Diferença entra as tonalidades de cada lado">
                <TextInput.Content
                  editable={false}
                  value={isConformed(data.DIFTON || data.DIFTON)}
                />
              </TextInput.Wrapper>
            </S.Root.Wrapper>
          </ScrollView>
          <CustomModalImage
            isVisible={modalOpen}
            onBackdropPress={handleOpenModal}
            onSwipeComplete={handleOpenModal}
          >
            <View style={{ flex: 1, justifyContent: 'center', gap: 15 }}>
              <Feather
                name="x"
                color={'black'}
                style={{
                  alignSelf: 'center',
                  backgroundColor: 'white',
                  borderRadius: 6,
                }}
                size={25}
                onPress={handleOpenModal}
              />
              <S.Root.ImageContentModal
                source={{ uri: 'data:image/jpg;base64,' + image }}
              />
            </View>
          </CustomModalImage>
        </>
      )}
    </>
  );
}

import { useCallback, useState } from 'react';
import { FlatList, ScrollView } from 'react-native';
import { Text, View } from 'react-native';

import { TextInput } from '@/components/TextInput';
// eslint-disable-next-line import-helpers/order-imports
import { Feather } from '@expo/vector-icons';
// import { GenerateAdvancedPieceProps } from 'util/realm/schema/historic_advanced_piece';

import { GenerateAdvancedPieceProps } from 'util/realm/schema/historic_advanced_piece';

import { baseOrLocalImage } from '../utils/convertBase64';
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
    return value === undefined || value === 0 ? 'Conforme' : 'Não conforme';
  }

  return (
    <>
      <ScrollView
        style={{
          flex: 1,
          zIndex: 99999,
        }}
      >
        <S.Root.Wrapper activeOpacity={1}>
          <FlatList
            data={data.IMAGEM}
            horizontal
            ItemSeparatorComponent={() => <View style={{ width: 20 }} />}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => {
              return (
                <>
                  <S.Root.Touchable
                    onPress={() => handleClickImage(item)}
                    activeOpacity={0.9}
                  >
                    <S.Root.ImageContent
                      placeholder={'Carregando ...'}
                      source={{ uri: baseOrLocalImage(item) }}
                    />
                  </S.Root.Touchable>
                </>
              );
            }}
          />
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
              value={isConformed(data.TONALIDADE || data.TONCEPPECAADIANTADA)}
            />
          </TextInput.Wrapper>
          <TextInput.Wrapper label="Textura">
            <TextInput.Content
              editable={false}
              value={isConformed(data.TEXTURA || data.TEXTURACEPPECAADIANTADA)}
            />
          </TextInput.Wrapper>
          <TextInput.Wrapper label="Brilho">
            <TextInput.Content
              editable={false}
              value={isConformed(data.BRILHO || data.BRILHOCEPPECAADIANTADA)}
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
              value={isConformed(data.DIFTON || data.DIFTONCEPPECAADIANTADA)}
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
          <S.Root.ImageContentModal source={{ uri: baseOrLocalImage(image) }} />
        </View>
      </CustomModalImage>
    </>
  );
}

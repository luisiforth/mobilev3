import React, { useMemo, useRef, useState } from 'react';
import { Alert, SectionList, View } from 'react-native';
import { useQuery } from 'react-query';

import Button from '@/components/Button';
import Loading from '@/components/Loading';
import Modal, { ComportModalProps } from '@/components/Modal';
import { TextInput } from '@/components/TextInput';
import { useCredentialStore, useFilterStore } from '@/store/filterStore';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from 'expo-router';
import { useTheme } from 'styled-components/native'; // Verifique a importação correta de useTheme
import { api } from 'util/axios/axios';

import {
  getChangeProductInReferenceURL,
  postProductInReferenceURL,
  putProductInReferenceURL,
} from './api-urls';
import { CardRef } from './components/CardRef';
import { handleButtonOptions, handleSectionOptions } from './functions';
import { ProductionLineRequest } from './types';

import * as S from './styles';

type ChangeReferenceProductLayout = {
  typeRoute: string | string[];
};

export default function ChangeReferenceProductLayout({
  typeRoute,
}: ChangeReferenceProductLayout) {
  const { filters } = useFilterStore();
  const { credential } = useCredentialStore();
  const navigation = useNavigation();
  const [filteredItem, setFilteredItem] = useState<ProductionLineRequest[]>([]);
  const theme = useTheme();
  const bottomSheetModalRef = useRef<ComportModalProps>(null);
  const snapPoints = useMemo(() => ['40%', '88%'], []);

  const query_references = useQuery('query_reference', async () => {
    const response = await api.get<ProductionLineRequest[]>(
      getChangeProductInReferenceURL(
        filters?.unit.value as number,
        filters?.line.value as number
      )
    );
    return response.data;
  });

  const producaoArray: ProductionLineRequest[] = [];
  const producaoEncerradaArray: ProductionLineRequest[] = [];

  if (!query_references.isLoading && query_references.data) {
    query_references.data.forEach((item) => {
      if (item.FLAGDESCPCPITEM === 'PRODUÇÃO PAUSADA') {
        producaoArray.push(item);
      } else if (item.FLAGDESCPCPITEM === 'AGUARDANDO INÍCIO') {
        producaoEncerradaArray.push(item);
      }
    });
  }

  const result = [
    {
      title: 'PRODUÇÃO PAUSADA',
      data: producaoArray,
    },
    {
      title: 'AGUARDANDO INÍCIO',
      data: producaoEncerradaArray,
    },
  ];

  const handleFilter = (value: number) => {
    const filter = query_references.data?.filter(
      (item) => item.IDPCPITEM == value
    );

    if (!filter) {
      return Alert.alert('Dado não encontrado!', '');
    }
    setFilteredItem(filter!);
    return bottomSheetModalRef.current?.handlePresentModalPress();
  };

  const RenderItem = ({ item }: { item: ProductionLineRequest }) => {
    return (
      <CardRef.Wrapper
        color={handleSectionOptions(item.FLAGDESCPCPITEM, theme).color}
        onPress={() => handleFilter(item.IDPCPITEM)}
      >
        <CardRef.Text title="Referência: " text={item.REFFICHAPROD} />
        <CardRef.Text title="Desc. Ref: " text={item.DESCFICHAPROD} />
        <CardRef.Text title="Formato: " text={item.DESFORMATO} />
        <CardRef.Text title="Plano: " text={item.DESCPCP} />
      </CardRef.Wrapper>
    );
  };

  const RenderSectionHeader = ({
    section,
  }: {
    data: ProductionLineRequest[];
    title: string;
  }) => {
    return (
      <CardRef.WrapperSection
        color={handleSectionOptions(section.title, theme).color}
      >
        <CardRef.Text text={section.title} />
        <CardRef.Icon
          icon={
            handleSectionOptions(section.title, theme)
              .icon as keyof typeof Feather.glyphMap
          }
        />
      </CardRef.WrapperSection>
    );
  };

  const handleSubmit = async () => {
    Alert.alert(
      'Deseja realizar esta ação ?',
      'Deseja realmente trocar/pausar produto?',
      [
        { text: 'Sim', onPress: () => handleFetch() },
        { text: 'Não', style: 'cancel' },
      ]
    );
  };

  const handleFetch = async () => {
    await api.put(
      putProductInReferenceURL({
        idpcp: filteredItem[0]?.IDPCPITEM,
        line: filters?.line.value as number,
        type: Number(typeRoute),
        unit: filters?.unit.value as number,
      })
    );

    const response = await api.post(
      postProductInReferenceURL({
        idFormat: filteredItem[0]?.IDFORMATO || 0,
        idProduct: filteredItem[0]?.IDFICHAPROD || 0,
        idUser: credential?.userid!,
        line: filters?.line.value as number,
        unit: filters?.unit.value as number,
      })
    );

    if (response.status != 200) {
      return Alert.alert('Houve um problema no envio', '');
    }

    Alert.alert('', `Registro enviado com sucesso`);
    return navigation.goBack();
  };

  return (
    <>
      {query_references.isLoading || query_references.isFetching ? (
        <Loading />
      ) : (
        <>
          <S.Root.Wrapper>
            <SectionList
              sections={result}
              renderItem={RenderItem}
              renderSectionHeader={RenderSectionHeader}
              SectionSeparatorComponent={ListItemSeparator}
              ItemSeparatorComponent={ListItemSeparator}
              initialNumToRender={4}
            />
          </S.Root.Wrapper>
          <Modal snapPoints={snapPoints} ref={bottomSheetModalRef}>
            <CardRef.WrapperSection
              color={
                handleSectionOptions(filteredItem[0]?.FLAGDESCPCPITEM, theme)
                  .color
              }
            >
              <CardRef.Text text={filteredItem[0]?.FLAGDESCPCPITEM} />
              <CardRef.Icon
                icon={
                  handleSectionOptions(filteredItem[0]?.FLAGDESCPCPITEM, theme)
                    .icon as keyof typeof Feather.glyphMap
                }
              />
            </CardRef.WrapperSection>
            <S.Root.WrapperModal>
              <TextInput.Wrapper label="Referência">
                <TextInput.Content
                  editable={false}
                  multiline
                  value={filteredItem[0]?.REFFICHAPROD + ''}
                />
              </TextInput.Wrapper>
              <TextInput.Wrapper label="Desc. Referência">
                <TextInput.Content
                  editable={false}
                  multiline
                  value={filteredItem[0]?.DESCFICHAPROD}
                />
              </TextInput.Wrapper>
              <TextInput.Wrapper label="Metragem Programada">
                <TextInput.Content
                  editable={false}
                  value={filteredItem[0]?.METRAPROGRAPCPITEM + ' m2'}
                />
              </TextInput.Wrapper>
              <TextInput.Wrapper label="Índice de Correção(%)">
                <TextInput.Content
                  editable={false}
                  value={filteredItem[0]?.CORRECAOPCPITEM + '%'}
                />
              </TextInput.Wrapper>
              <TextInput.Wrapper label="Metragem Final">
                <TextInput.Content
                  editable={false}
                  value={filteredItem[0]?.METRAFINALPCPITEM + ' m²'}
                />
              </TextInput.Wrapper>
              <TextInput.Wrapper label="Plano">
                <TextInput.Content
                  editable={false}
                  multiline
                  value={filteredItem[0]?.DESCPCP}
                />
              </TextInput.Wrapper>
              <Button
                text={handleButtonOptions(typeRoute as string, theme).text}
                color={handleButtonOptions(typeRoute as string, theme).color}
                onPress={handleSubmit}
              />
            </S.Root.WrapperModal>
          </Modal>
        </>
      )}
    </>
  );
}

export const ListItemSeparator = () => {
  return <View style={{ height: 10 }} />;
};

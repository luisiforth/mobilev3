import { useEffect, useMemo, useRef, useState } from 'react';
import React from 'react';
import { Alert, SectionList, View } from 'react-native';
import { useQuery } from 'react-query';

import Button from '@/components/Button';
import Loading from '@/components/Loading';
import Modal, { ComportModalProps } from '@/components/Modal';
import { TextInput } from '@/components/TextInput';
import { useFilterStore } from '@/store/filterStore';
import { Feather } from '@expo/vector-icons';
import { Link, useNavigation } from 'expo-router';
import { useTheme } from 'styled-components/native';
import { api } from 'util/axios/axios';
import { formatDate } from 'util/functions/formatDate';
import { removeHourZeros } from 'util/functions/functionHours';

import { getChangeReferenceURL } from './api-urls';
import { CardRef } from './components/CardRef';
import { handleSectionOptions } from './functions';
import { ProductionLineRequest } from './types';

import * as S from './styles';

export default function ChangeReferenceLayout() {
  const navigation = useNavigation();
  const { filters } = useFilterStore();
  const [filteredItem, setFilteredItem] = useState<ProductionLineRequest[]>([]);
  const theme = useTheme();
  const bottomSheetModalRef = useRef<ComportModalProps>(null);
  const snapPoints = useMemo(() => ['40%', '95%'], []);

  const query_references = useQuery('query_reference', async () => {
    const response = await api.get<ProductionLineRequest[]>(
      getChangeReferenceURL(
        filters?.unit.value as number,
        filters?.line.value as number
      )
    );

    return response.data;
  });

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      query_references.refetch();
    });

    return unsubscribe;
  }, [navigation]);

  const handleFilter = (value: number) => {
    const filter = query_references.data?.filter(
      (item) => item.IDFICHAPROD == value
    );

    if (!filter) {
      return Alert.alert('Dado não encontrado!', '');
    }

    setFilteredItem(filter!);
    return bottomSheetModalRef.current?.handlePresentModalPress();
  };

  const deepCopy = query_references.isLoading
    ? []
    : JSON.parse(JSON.stringify(query_references.data));
  const firstElement = deepCopy?.shift();
  const data_obj = !query_references.isLoading
    ? [
        {
          title: 'EM PRODUÇÃO',
          data: [firstElement],
        },
        {
          title: 'PRODUÇÃO ENCERRADA',
          data: deepCopy,
        },
      ]
    : [];

  const RenderItem = ({ item }: { item: ProductionLineRequest }) => {
    if (item == undefined) {
      return <View />;
    }

    return (
      <CardRef.Wrapper
        color={handleSectionOptions(item?.FLAGDESCPRODLINHA, theme).color}
        onPress={() => handleFilter(item?.IDFICHAPROD)}
      >
        <CardRef.Text title="Referência: " text={item?.REFFICHAPROD} />
        <CardRef.Text title="Desc. Ref: " text={item?.DESCLINHA} />
        <CardRef.Text title="Formato: " text={item?.DESFORMATO} />
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

  return (
    <>
      {query_references.isLoading ||
      query_references.isFetching ||
      data_obj.length == 0 ? (
        <Loading />
      ) : (
        <>
          <S.Root.Wrapper>
            <SectionList
              sections={data_obj}
              renderItem={RenderItem}
              renderSectionHeader={RenderSectionHeader}
              SectionSeparatorComponent={ListItemSeparator}
              ItemSeparatorComponent={ListItemSeparator}
              initialNumToRender={4}
            />

            <S.Root.ContainerButton>
              <Link href={'/reference/1'} asChild>
                <Button
                  text="Trocar Produto"
                  color={theme.colors.blue.button}
                />
              </Link>
              <Link href={'/reference/2'} asChild>
                <Button
                  text="Pausar Produção"
                  color={theme.colors.orange.button}
                />
              </Link>
            </S.Root.ContainerButton>
          </S.Root.Wrapper>
          <Modal snapPoints={snapPoints} ref={bottomSheetModalRef}>
            {/* <TextInput.Wrapper label="Situação" /> */}
            <CardRef.WrapperSection
              color={
                handleSectionOptions(filteredItem[0]?.FLAGDESCPRODLINHA, theme)
                  .color
              }
            >
              <CardRef.Text text={filteredItem[0]?.FLAGDESCPRODLINHA} />
              <CardRef.Icon
                icon={
                  handleSectionOptions(
                    filteredItem[0]?.FLAGDESCPRODLINHA,
                    theme
                  ).icon as keyof typeof Feather.glyphMap
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
              <TextInput.Wrapper label="Linha">
                <TextInput.Content
                  editable={false}
                  value={filteredItem[0]?.DESCLINHA}
                />
              </TextInput.Wrapper>
              <TextInput.Wrapper label="Data/Hora Inicio">
                <TextInput.Content
                  editable={false}
                  value={`${formatDate(
                    filteredItem[0]?.DATAINIPRODLINHA
                  )} ${removeHourZeros(filteredItem[0]?.HORAINIPRODLINHA)}`}
                />
              </TextInput.Wrapper>
              <TextInput.Wrapper label="Data/Hora Fim">
                <TextInput.Content
                  editable={false}
                  value={`${
                    formatDate(filteredItem[0]?.DATAFIMPRODLINHA) || ''
                  } ${
                    removeHourZeros(filteredItem[0]?.HORAFIMPRODLINHA) || ''
                  }`}
                />
              </TextInput.Wrapper>
              <TextInput.Wrapper label="Usuário">
                <TextInput.Content
                  editable={false}
                  value={filteredItem[0]?.NOMEUSU}
                />
              </TextInput.Wrapper>
              <TextInput.Wrapper label="Código">
                <TextInput.Content
                  editable={false}
                  multiline
                  value={filteredItem[0]?.IDFICHAPROD + ''}
                />
              </TextInput.Wrapper>
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

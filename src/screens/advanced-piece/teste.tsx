import React, { useLayoutEffect, useRef, useState } from 'react';
import { Text, View, Alert, FlatList, RefreshControl } from 'react-native';
import { useMutation, useQuery } from 'react-query';

import { useNetInfo } from '@/hooks/useNetInfo';
import { useCredentialStore, useFilterStore } from '@/store/filterStore';
import { api } from 'util/axios/axios';
import { Historic_advanced_piece } from 'util/realm/schema/historic_advanced_piece';

import { getAdvPiece, postAdvPiece } from './api-urls';
import { StepCamera, StepOne, StepTwo, schema } from './components/Modals';

import * as S from './styles';

export default function AdvancedPieceLayout() {
  const bottomSheetModalRef = useRef(null);
  const [refreshing, setRefreshing] = useState(true);
  const [isCurrentIndex, setCurrentIndex] = useState(0);
  const [isPostDate, setIsPostDate] = useState(false);
  const isConnected = useNetInfo();
  const { filters } = useFilterStore();
  const { credential } = useCredentialStore();

  const {
    data: dataFromRealm,
    isLoading: loadingRealm,
    refetch: refetchRealm,
  } = useQuery('query_realm', queryRealm);

  const { mutate: postMutation, error: mutateError } = useMutation(
    'mutate_data',
    async (item) => {
      try {
        const response = await api.post(postAdvPiece(), [item]);
        if (response.status === 200) {
          deleteRecord(item._id!);
          Alert.alert('', 'Dado enviado com sucesso!');
        } else {
          Alert.alert('Falha', 'Dado não enviado, tente novamente mais tarde!');
        }
      } catch (error) {
        console.error('Erro ao realizar a mutação:', error);
        throw error;
      }
    },
    {
      onSettled: () => refetch(),
    }
  );

  const { data, isLoading, refetch, isRefetching } = useQuery(
    ['query_piece', isConnected, dataFromRealm, filters],
    fetchData,
    {
      enabled: !loadingRealm,
    }
  );

  async function queryRealm() {
    const query = queryRealm();
    if (!query) return null;
    const resp = query.toJSON();
    return resp;
  }

  async function fetchData() {
    if (!filters) {
      Alert.alert(
        'Ocorreu um erro',
        'Não foi possível realizar a busca dos dados, você está sem filtros'
      );
      return [];
    }

    if (dataFromRealm === undefined) {
      Alert.alert(
        'Ocorreu um erro',
        'Não foi possível realizar a busca dos dados, contacte o administrador'
      );
      return [];
    }

    const data_realm = dataFromRealm.map((obj) => ({
      ...obj,
      FLAG: true,
    }));

    if (!isConnected) {
      setRefreshing(false);
      return data_realm;
    }

    const request = await api.get(
      getAdvPiece(filters.unit?.value as number, filters.line?.value as number)
    );

    if (request.status !== 200) {
      Alert.alert(
        'Ocorreu um erro',
        'Não foi possível realizar a busca dos dados, contacte o administrador'
      );
      return [];
    }

    const data_array = [...data_realm, ...request.data];

    setRefreshing(false);
    return data_array;
  }

  async function handleDelete(item: string) {
    await Alert.alert('', 'Deseja cancelar este registro ?', [
      {
        text: 'Sim',
        onPress: () => {
          deleteRecord(item);
          refetchRealm();
        },
      },
      {
        text: 'Não',
        style: 'cancel',
      },
    ]);
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          (isConnected || isPostDate) &&
          dataFromRealm &&
          dataFromRealm?.length > 0 && (
            <CardCep.Icon
              icon="refresh-ccw"
              onPress={() => sendAllDatas(dataFromRealm, 0)}
            />
          )
        );
      },
    });

    if (isConnected && dataFromRealm?.length) {
      Alert.alert('', 'Você possui dados a serem sincronizados.');
    }
  }, [dataFromRealm]);

  // ... Rest of the code

  return (
    <S.Root.Wrapper>
      {isLoading || refreshing || isRefetching || isPostDate ? (
        isPostDate ? (
          <View style={{ alignItems: 'center' }}>
            <Loading />
            <Text>
              Aguarde, estamos enviando os dados {isCurrentIndex} de{' '}
              {dataFromRealm?.length}.
            </Text>
          </View>
        ) : (
          <Loading />
        )
      ) : (
        <>
          <S.Root.WrapperFlatList>
            <FlatList
              data={data || []}
              ItemSeparatorComponent={ListItemSeparator}
              renderItem={RenderItem}
              keyExtractor={(item) => item._id || item.ID.toString()}
              initialNumToRender={5}
              refreshControl={
                <RefreshControl
                  colors={[theme.colors.primary[300]]}
                  refreshing={refreshing}
                  onRefresh={refetch}
                />
              }
            />
          </S.Root.WrapperFlatList>
          <Button
            text="Apontamento"
            onPress={() =>
              bottomSheetModalRef.current?.handlePresentModalPress()
            }
          />
          <Modal snapPoints={['80%', '80%']} ref={bottomSheetModalRef}>
            <S.Root.WrapperModal>
              <StepModal
                onSubmit={onSubmit}
                schema={schema}
                steps={[StepCamera, StepOne, StepTwo]}
              />
            </S.Root.WrapperModal>
          </Modal>
        </>
      )}
    </S.Root.Wrapper>
  );
}

export const ListItemSeparator = () => {
  return <View style={{ height: 10 }} />;
};

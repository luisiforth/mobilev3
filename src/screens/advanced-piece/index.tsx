import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { FieldValues, SubmitHandler } from 'react-hook-form';
import { FlatList, Text, View, Alert } from 'react-native';
import { RefreshControl } from 'react-native';
import { useMutation, useQuery } from 'react-query';

import Button from '@/components/Button';
import { CardCep } from '@/components/CardCep';
import Loading from '@/components/Loading';
import Modal, { ComportModalProps } from '@/components/Modal';
import StepModal from '@/components/StepModal';
import useRealmCrud from '@/hooks/useCrud';
import { useNetInfo } from '@/hooks/useNetInfo';
import { useCredentialStore, useFilterStore } from '@/store/filterStore';
import { Link, useNavigation } from 'expo-router';
import { useTheme } from 'styled-components/native';
import { api } from 'util/axios/axios';
import { Historic_advanced_piece } from 'util/realm/schema/historic_advanced_piece';

import { getAdvPiece, postAdvPiece } from './api-urls';
import { StepCamera, StepOne, StepTwo, schema } from './components/Modals';
import { renderItemProps } from './types';

import * as S from './styles';

export default function AdvancedPieceLayout() {
  const bottomSheetModalRef = useRef<ComportModalProps>(null);
  const [refreshing, setRefreshing] = useState(true);
  const theme = useTheme();
  const isConnected = useNetInfo();
  const navigation = useNavigation();
  const { filters } = useFilterStore();
  const { credential } = useCredentialStore();
  const { queryRealm, deleteRecord, createRecord, deleteAll } = useRealmCrud(
    'historic_advanced_piece',
    //@ts-ignore
    Historic_advanced_piece.generate
  );

  const dataFromRealm = queryRealm()?.toJSON();
  // console.log(dataFromRealm);

  const { mutate: postMutation } = useMutation(
    async (item: { _id: string }) => {
      try {
        const response = await api.post(postAdvPiece(), [item]);
        if (response.status == 200) {
          deleteRecord(item._id!);
          return Alert.alert('', 'Dado enviado com sucesso!');
        }

        return Alert.alert(
          'Falha',
          'Dado não enviado, tente novamente mais tarde!'
        );
      } catch (error) {
        console.error('Erro ao realizar a mutação:', error);
        throw error;
      }
    },
    {
      onSettled: () => refetch(),
    }
  );

  const { data, isLoading, refetch, isRefetching, error } = useQuery(
    ['query_piece', isConnected, dataFromRealm, filters],
    async () => {
      if (filters == null) {
        return [];
      }

      if (dataFromRealm == undefined) {
        Alert.alert(
          'Ocorreu um erro',
          'Não foi possivel realizar a busca dos dados, contacte o administrador'
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
        getAdvPiece(
          filters.unit?.value as number,
          filters.line?.value as number
        )
      );

      if (request.status != 200) {
        Alert.alert(
          'Ocorreu um erro',
          'Não foi possivel realizar a busca dos dados, contacte o administrador'
        );
        return [];
      }

      const data_array = [...data_realm, ...request.data];

      setRefreshing(false);
      return data_array;
    }
  );
  // console.log(data);
  function sleep(milliseconds: number) {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
  }

  const handleSubmitDatas = async () => {
    setRefreshing(true);
    // console.log(dataFromRealm);
    // if (dataFromRealm) return Alert.alert('', 'Erro ao sincronizar');
    const result = await api.post(postAdvPiece(), dataFromRealm);
    await sleep(1000);
    deleteAll();
    if (result.status == 200) Alert.alert('', 'Dados enviados com sucesso');
    return refetch();
  };

  const handleDelete = async (item: string) => {
    await Alert.alert('', 'Deseja cancelar este registro ?', [
      {
        text: 'Sim',
        onPress: () => deleteRecord(item),
      },
      {
        text: 'Não',
        style: 'cancel',
      },
    ]);
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          isConnected && (
            <CardCep.Icon icon="refresh-ccw" onPress={handleSubmitDatas} />
          )
        );
      },
    });

    if (isConnected && dataFromRealm?.length) {
      return Alert.alert('', 'Você possui dados a serem sincronizados.');
    }

    console.log('render');
  }, [navigation, isConnected]);

  function RenderItem({ item, index }: renderItemProps) {
    const id = item?.FLAG ? item._id : item.ID;
    return (
      <CardCep.Wrapper onAsync={item?.FLAG} key={index}>
        <Link href={`/cep/${id}`}>
          <S.Root.ContainerRenderItem>
            <CardCep.Image url={[item.IMAGEM[0]] || item.IMAGEM} />
            <S.Root.ContainerRenderItemText>
              <Text>
                <S.Root.Text>TOM: </S.Root.Text>
                {item.TOM || item.TOMCEPPECAADIANTADA}
              </Text>
              <Text>
                <S.Root.Text>Data:</S.Root.Text>
                {item.DATA || item.DATACEPPECAADIANTADA}
              </Text>
              <Text>
                <S.Root.Text>Hora:</S.Root.Text>
                {item.HORA || item.HORACEPPECAADIANTADA}
              </Text>
            </S.Root.ContainerRenderItemText>
          </S.Root.ContainerRenderItem>

          {/* </Link> */}
        </Link>
        <S.Root.ContainerRenderItem>
          {item?.FLAG && (
            <>
              <CardCep.Icon
                onPress={() => handleDelete(item._id)}
                icon="trash-2"
              />
              {isConnected && (
                <CardCep.Icon
                  icon="refresh-ccw"
                  onPress={() => postMutation(item)}
                />
              )}
            </>
          )}
        </S.Root.ContainerRenderItem>
      </CardCep.Wrapper>
    );
  }

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (filters == null) {
      Alert.alert(
        'Não há dados na unidade e linha',
        'Favor selecionar unidade e linha para progredir.'
      );
      return;
    }

    const body = {
      IDUSUARIO: credential?.userid, //Alterar para o usuário LOGADO.
      IDUNIDADE: filters.unit?.value,
      IDLINHA: filters.line?.value,
      IDDEFEITO: data.defect.value,
      DESCDEFEITO: data.defect.label,
      DEFORMADOCEPPECAADIANTADA: data.deformity.value,
      IMAGEM: data.images,
      DIFTONCEPPECAADIANTADA: data.diff.value,
      OBSCEPPECAADIANTADA: data.observation || ' ',
      BRILHOCEPPECAADIANTADA: data.shine.value,
      TEXTURACEPPECAADIANTADA: data.texture.value,
      TOMCEPPECAADIANTADA: data.tom,
      TONCEPPECAADIANTADA: data.tonality.value,
    };

    if (!isConnected) {
      console.log('TESTE ?');
      createRecord(body);
      return refetch();
    }

    try {
      const result = await api.post(postAdvPiece(), [body]);
      if (result.status != 200)
        return Alert.alert(
          'Ocorreu um erro no envio',
          'Contacte um administrador.'
        );
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return Alert.alert(
        'Ocorreu um erro no envio',
        `Contacte um administrador e informe o erro: ${error.message}.`
      );
    }
    Alert.alert('', 'Enviado com sucesso');
    return refetch();
  };

  return (
    <S.Root.Wrapper>
      {isLoading || refreshing || isRefetching ? (
        <Loading />
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

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { SubmitHandler } from 'react-hook-form';
import {
  Alert,
  Pressable,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import { Text } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { useQuery } from 'react-query';

import Button from '@/components/Button';
import { ListItemEmpty } from '@/components/ListItemEmpty';
import Loading from '@/components/Loading';
import Modal, { ComportModalProps } from '@/components/Modal';
import StepModal from '@/components/StepModal';
import { COLORS } from '@/constants';
import { useCredentialStore, useFilterStore } from '@/store/filterStore';
import Feather from '@expo/vector-icons/Feather';
import { FlashList } from '@shopify/flash-list';
import { AxiosError } from 'axios';
import * as Device from 'expo-device';
import { useTheme } from 'styled-components/native';
import { api } from 'util/axios/axios';
import { formatDate } from 'util/functions/formatDate';
import { missingFilters } from 'util/functions/missingFilters';
import * as yup from 'yup';

import { StepOne, StepTwo, StepThree, schema } from './components/Modals';
import { TItem } from './types';
import { getDefectRectify } from './utils';

type TSchema = yup.InferType<typeof schema>;

export default function ControlQualityDefectLayout() {
  const { styles } = useStyles(stylesheet);
  const [selected, setSelected] = useState<TItem | null>(null);
  const { credential } = useCredentialStore();
  const bottomSheetModalRef = useRef<ComportModalProps>(null);
  const theme = useTheme();
  const snapPoints = useMemo(() => ['100%'], []);
  const { filters } = useFilterStore();
  const queryDefects = useQuery('query_defect_rectify', () => {
    if (filters == null || filters == undefined) {
      missingFilters(!!filters);
    }
    return getDefectRectify(filters?.unit?.value, filters?.line?.value);
  });
  useEffect(() => {
    return console.log(Device.deviceType);
  }, []);
  const onSubmit: SubmitHandler<TSchema> = async (data) => {
    const ITENS = data.values?.map((v) => ({
      AMOSTRA: data.sample,
      QUANTIDADE: {
        C: v.c,
        QUEBRA: v.q,
      },
      DEFEITO: {
        ID: v.id,
      },
    }));

    const body = {
      TOM: data.tone,
      TONALIDADE: data.tonality,
      ITENS: ITENS,
      FICHAPRODUTO: {
        ID: data.product.value,
      },
      UNIDADE: {
        ID: filters?.unit?.value,
      },
      LINHA: {
        ID: filters?.line?.value,
      },
      USUARIO: {
        ID: credential?.userid,
      },
    };
    console.log(body);
    try {
      await api.post('v3/retifica/defeito', body);
      queryDefects.refetch();
      bottomSheetModalRef.current?.handleDismiss();
      Alert.alert('', 'Enviado com sucesso!');
    } catch (err: any | AxiosError) {
      console.log(err.response.data.message);
    }
    return;
  };

  const styleColorRow = useCallback(
    (id: number) => {
      if (selected?.ID == id) {
        return { backgroundColor: COLORS.gray[400] };
      }
      return { backgroundColor: COLORS.gray[100] };
    },
    [selected?.ID]
  );

  const title = [
    'Situação',
    'Data',
    'Hora',
    'Referência',
    'Defeito',
    'Qtd. Quebra',
    'Qtd. C',
    'Qtd Amostra',
    'Índice de Qualidade',
    'Tom',
    'Tonalidade/Lote',
    'Usuário',
  ];

  if (queryDefects.isLoading || queryDefects.isRefetching) {
    return <Loading />;
  }

  const handleDataSelect = (item: TItem) => {
    return setSelected(item);
  };

  const handleCancel = () => {
    if (!selected)
      return Alert.alert(
        'Selecione um registro',
        'Selecionar um registro antes de cancelar!'
      );

    if (selected.FLAG.ID == 1)
      return Alert.alert(
        'Registro ja cancelado',
        'Selecione outro registro para realizar está ação.'
      );

    Alert.alert('Deseja realizar esta ação?', '', [
      {
        style: 'cancel',
        text: 'Não',
      },
      {
        onPress: async () => {
          try {
            await api.put(`v3/retifica/defeito/${selected?.ID}`);
            queryDefects.refetch();
            Alert.alert('', 'Registro cancelado com sucesso');
          } catch (err: any | AxiosError) {
            console.log(err.response.data.message);
          }
        },
        text: 'Sim',
      },
    ]);

    return setSelected(null);
  };

  return (
    <View style={{ flex: 1 }}>
      {queryDefects.data?.length == 0 ? (
        <ListItemEmpty />
      ) : (
        <ScrollView
          disableIntervalMomentum
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          <TouchableOpacity activeOpacity={0.9} style={{ zIndex: 0 }}>
            <View style={styles.header}>
              {title.map((value, index) => (
                <Text key={index} style={styles.headerItem}>
                  {value}
                </Text>
              ))}
            </View>
            <FlashList
              estimatedItemSize={100}
              data={queryDefects.data}
              renderItem={({ item, index }) => {
                return (
                  <TouchableOpacity
                    style={[styles.row, styleColorRow(item.ID), { zIndex: 1 }]}
                    onPress={() => handleDataSelect(item)}
                    activeOpacity={0.8}
                    key={index}
                  >
                    <Text
                      style={[styles.cell, styles.cellSituation(item.FLAG.ID)]}
                    >
                      {item.FLAG.DESCRICAO}
                    </Text>
                    <Text style={styles.cell}>{formatDate(item.DATA)}</Text>
                    <Text style={styles.cell}>
                      {item.HORA.replace('.000', '')}
                    </Text>
                    <Text style={styles.cell}>{item.PRODUTO.REFERENCIA}</Text>
                    <Text style={styles.cell}>{item.DEFEITO.DESCRICAO}</Text>
                    <Text style={styles.cell}>{item.QUANTIDADE.C}</Text>
                    <Text style={styles.cell}>{item.QUANTIDADE.QUEBRA}</Text>
                    <Text style={styles.cell}>{item.AMOSTRA}</Text>
                    <Text style={styles.cell}>{item.INDICE}</Text>
                    <Text style={styles.cell}>{item.TOM}</Text>
                    <Text style={styles.cell}>{item.TONALIDADE}</Text>
                    <Text style={styles.cell}>{item.USUARIO.NOME}</Text>
                  </TouchableOpacity>
                );
              }}
            />
          </TouchableOpacity>
        </ScrollView>
      )}
      <View
        style={{
          flexDirection: 'row',
        }}
      >
        <Button
          size="large"
          text="Adicionar"
          onPress={() => bottomSheetModalRef.current?.handlePresentModalPress()}
        />
        <Button
          size="large"
          text="Cancelar"
          onPress={handleCancel}
          color={theme.colors.orange.button}
        />
      </View>

      <Modal
        enablePanDownToClose={false}
        snapPoints={snapPoints}
        enableHandlePanningGesture={false}
        enableContentPanningGesture={false}
        handleIndicatorStyle={{ backgroundColor: 'transparent' }}
        ref={bottomSheetModalRef}
      >
        <Pressable
          hitSlop={20}
          onPress={() => bottomSheetModalRef.current?.handleDismiss()}
        >
          <Feather
            name="x"
            size={35}
            style={{ alignSelf: 'flex-end', marginRight: 20 }}
          />
        </Pressable>
        <View style={{ padding: 10, gap: 20 }}>
          <StepModal
            onSubmit={onSubmit}
            schema={schema}
            steps={[StepOne, StepTwo, StepThree]}
          />
        </View>
      </Modal>
    </View>
  );
}

export const stylesheet = createStyleSheet((theme) => ({
  cell: {
    color: 'black',
    fontSize: 16,
    textAlign: 'center',
    width: 200,
  },
  cellSituation: (isActive: boolean) => ({
    backgroundColor: isActive ? theme.colors.orange.button : 'transparent',
    padding: 14,
  }),
  header: {
    alignItems: 'center',
    backgroundColor: theme.colors.primary[400],
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  headerItem: {
    borderColor: 'black',
    color: 'white',
    flex: 1,
    fontSize: 20,
    textAlign: 'center',
    width: 200,
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
    height: 50,
    justifyContent: 'center',
  },
}));

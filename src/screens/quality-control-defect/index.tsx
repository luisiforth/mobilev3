import React, { useCallback, useMemo, useRef, useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import {
  Alert,
  FlatList,
  ImageStyle,
  ScrollView,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { StyleSheet, Text } from 'react-native';
import { useQuery } from 'react-query';

import Button from '@/components/Button';
import { ListItemEmpty } from '@/components/ListItemEmpty';
import Loading from '@/components/Loading';
import Modal, { ComportModalProps } from '@/components/Modal';
import StepModal from '@/components/StepModal';
import { COLORS } from '@/constants';
import { useCredentialStore, useFilterStore } from '@/store/filterStore';
import { AxiosError } from 'axios';
import { useTheme } from 'styled-components/native';
import { api } from 'util/axios/axios';
import { formatDate } from 'util/functions/formatDate';
import { missingFilters } from 'util/functions/missingFilters';
import * as yup from 'yup';

import { StepOne, StepTwo, StepThree, schema } from './components/Modals';
import { TItem } from './types';
import { getDefectRectify } from './utils';

export type TStyles = {
  spaceCell: (index: number) => ViewStyle | TextStyle | ImageStyle;
  cellSituation: (value: boolean) => ViewStyle | TextStyle | ImageStyle;
};

type TSchema = yup.InferType<typeof schema>;

export default function ControlQualityDefectLayout() {
  const [selected, setSelected] = useState<TItem | null>(null);
  const { credential } = useCredentialStore();
  const bottomSheetModalRef = useRef<ComportModalProps>(null);
  const theme = useTheme();
  const snapPoints = useMemo(() => ['40%', '95%'], []);
  const { filters } = useFilterStore();
  const queryDefects = useQuery('query_defect_rectify', () => {
    if (filters == null || filters == undefined) {
      missingFilters(!!filters);
    }
    return getDefectRectify(filters?.unit?.value, filters?.line?.value);
  });

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

  if (queryDefects.data?.length == 0) {
    return <ListItemEmpty />;
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

    Alert.alert('Deseja realizar está ação ?', '', [
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
      <ScrollView
        disableIntervalMomentum
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        <TouchableOpacity activeOpacity={0.8} style={{ zIndex: 0 }}>
          <View style={styles.header}>
            {title.map((value, index) => (
              <Text key={index} style={styles.headerItem}>
                {value}
              </Text>
            ))}
          </View>
          <View style={{ flex: 1 }}>
            <FlatList
              style={{ flex: 1 }}
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
          </View>
        </TouchableOpacity>
      </ScrollView>
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

      <Modal snapPoints={snapPoints} ref={bottomSheetModalRef}>
        <View>
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

export const styles = StyleSheet.create<TStyles | any>({
  cell: {
    color: 'black',
    fontSize: 16,
    textAlign: 'center',
    width: 200,
  },
  cellSituation: (isActive: boolean): ViewStyle => ({
    backgroundColor: isActive ? COLORS.orange.situation : 'transparent',
    padding: 14,
  }),
  header: {
    alignItems: 'center',
    backgroundColor: COLORS.primary[400],
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
});

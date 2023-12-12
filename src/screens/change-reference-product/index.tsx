import React, { useCallback, useState } from 'react';
import {
  Alert,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  ViewStyle,
  TextStyle,
  ImageStyle,
} from 'react-native';
import { useQuery } from 'react-query';

import Button from '@/components/Button';
import { ListItemEmpty } from '@/components/ListItemEmpty';
import Loading from '@/components/Loading';
import Table from '@/components/Table';
import { COLORS } from '@/constants';
import { useCredentialStore, useFilterStore } from '@/store/filterStore';
import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useTheme } from 'styled-components/native'; // Verifique a importação correta de useTheme
import { api } from 'util/axios/axios';

import {
  getChangeProductInReferenceURL,
  postProductInReferenceURL,
  putProductInReferenceURL,
} from './api-urls';
import { ProductionLineRequest } from './types';

export type TStyles = {
  spaceCell: (index: number) => ViewStyle | TextStyle | ImageStyle;
  cellSituation: (value: boolean) => ViewStyle | TextStyle | ImageStyle;
};

type ChangeReferenceProductLayout = {
  typeRoute: string | string[];
};

export default function ChangeReferenceProductLayout({
  typeRoute,
}: ChangeReferenceProductLayout) {
  const [selected, setSelected] = useState<ProductionLineRequest | null>(null);
  const { filters } = useFilterStore();
  const { credential } = useCredentialStore();
  const theme = useTheme();
  const query_references = useQuery('query_reference', async () => {
    if (!filters) return;
    const response = await api.get<ProductionLineRequest[]>(
      getChangeProductInReferenceURL(
        filters.unit?.value as number,
        filters.line?.value as number
      )
    );
    return response.data;
  });

  const handleDataSelect = (item: ProductionLineRequest) => {
    return setSelected(item);
  };

  const title = [
    'Situação',
    'Seq. Produção',
    'Referência',
    'Descrição',
    'Metragem Programada',
    'índice de Correção(%)',
    'Metragem Final',
    'Plano',
  ];

  const handleSubmit = async () => {
    Alert.alert(
      'Deseja realizar esta ação?',
      'Deseja realmente trocar/pausar produto?',
      [
        { text: 'Sim', onPress: () => handleFetch() },
        { text: 'Não', style: 'cancel' },
      ]
    );
  };

  const handleFetch = async () => {
    if (!filters) return;

    await api.put(
      putProductInReferenceURL({
        idpcp: selected?.IDPCP as number,
        line: filters.line?.value as number,
        type: Number(typeRoute),
        unit: filters.unit?.value as number,
      })
    );

    const response = await api.post(
      postProductInReferenceURL({
        idFormat: selected?.IDFORMATO as number,
        idProduct: selected?.IDFICHAPROD as number,
        idUser: credential?.userid as number,
        line: filters.line?.value as number,
        unit: filters.unit?.value as number,
      })
    );

    if (response.status != 200) {
      return Alert.alert('Houve um problema no envio.', '');
    }

    Alert.alert('', `Registro enviado com sucesso!`);
    return router.push('/changeReference');
  };

  const styleColorRow = useCallback(
    (id: number) => {
      if (selected?.IDPCPITEM == id) {
        return { backgroundColor: COLORS.gray[400] };
      }
      return { backgroundColor: COLORS.gray[100] };
    },
    [selected?.IDPCPITEM]
  );

  if (query_references.isLoading || query_references.isRefetching) {
    return <Loading />;
  }
  return (
    <View style={{ flex: 1 }}>
      {!query_references.data ? (
        <ListItemEmpty />
      ) : (
        <Table<ProductionLineRequest>
          data={query_references.data as []}
          head={title}
          renderItem={({ index, item }) => {
            return (
              <TouchableOpacity
                style={[styles.row, styleColorRow(item.IDPCPITEM)]}
                onPress={() => handleDataSelect(item)}
                activeOpacity={0.8}
                key={index}
              >
                <Text
                  style={[styles.cell, styles.cellSituation(item.FLAGPCPITEM)]}
                >
                  {item.FLAGDESCPCPITEM}
                </Text>
                <Text style={styles.cell}>{item.SEQPRODPCPITEM}</Text>
                <Text style={styles.cell}>{item.REFFICHAPROD}</Text>
                <Text style={styles.cell}>{item.DESCFICHAPROD}</Text>
                <Text style={styles.cell}>{item.METRAPROGRAPCPITEM}</Text>
                <Text style={styles.cell}>{item.CORRECAOPCPITEM}</Text>
                <Text style={styles.cell}>{item.METRAFINALPCPITEM}</Text>
                <Text style={styles.cell}>{item.DESCPCP}</Text>
              </TouchableOpacity>
            );
          }}
          setState={setSelected}
          state={selected}
        />
      )}
      <View
        style={{
          flexDirection: 'row',
        }}
      >
        <Button
          icon={
            <Feather
              name={Number(typeRoute) == 1 ? 'save' : 'pause'}
              color={'white'}
              size={25}
            />
          }
          size="large"
          text={Number(typeRoute) == 1 ? 'Salvar' : 'Pausar'}
          onPress={handleSubmit}
          color={Number(typeRoute) == 1 ? '' : theme.colors.orange.button}
        />
      </View>
    </View>
  );
}

export const styles = StyleSheet.create<TStyles | any>({
  cell: {
    color: 'black',
    fontSize: 16,
    alignContent: 'center',
    textAlign: 'center',
    width: 300,
  },
  cellSituation: (isActive: boolean): ViewStyle => ({
    backgroundColor: isActive ? COLORS.orange.situation : 'transparent',
    padding: 14,
  }),
  row: {
    alignItems: 'center',
    flexDirection: 'row',
    height: 50,
    justifyContent: 'center',
  },
});

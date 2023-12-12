import { useEffect, useState } from 'react';
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
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
import { useFilterStore } from '@/store/filterStore';
import { Feather } from '@expo/vector-icons';
import { router, useNavigation } from 'expo-router';
import { useTheme } from 'styled-components/native';
import { api } from 'util/axios/axios';
import { formatDate } from 'util/functions/formatDate';
import { removeHourZeros } from 'util/functions/functionHours';

import { getChangeReferenceURL } from './api-urls';
import { ProductionLineRequest } from './types';

export type TStyles = {
  spaceCell: (index: number) => ViewStyle | TextStyle | ImageStyle;
  cellSituation: (value: boolean) => ViewStyle | TextStyle | ImageStyle;
};

export default function ChangeReferenceLayout() {
  const { filters } = useFilterStore();
  const theme = useTheme();
  const [selected, setSelected] = useState<ProductionLineRequest | null>(null);
  const navigation = useNavigation();

  const query_references = useQuery(['query_reference'], async () => {
    if (!filters) return;
    const response = await api.get<ProductionLineRequest[]>(
      getChangeReferenceURL(
        filters.unit?.value as number,
        filters.line?.value as number
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

  if (query_references.isLoading || query_references.isRefetching) {
    return <Loading />;
  }

  const title = [
    'Situação',
    'Código',
    'Linha',
    'Data Inicio',
    'Hora Inicio',
    'Data Fim',
    'Hora Fim',
    'Minutos Prod.',
    'Referência',
    'Formato',
    'Usuário',
  ];

  return (
    <View style={{ flex: 1 }}>
      {query_references.data?.length == 0 ? (
        <ListItemEmpty />
      ) : (
        <>
          <Table<ProductionLineRequest>
            data={query_references.data as []}
            head={title}
            renderItem={({ index, item }) => {
              return (
                <TouchableOpacity
                  style={[
                    styles.row,
                    { backgroundColor: COLORS.gray[100], zIndex: 1 },
                  ]}
                  activeOpacity={0.8}
                  key={index}
                >
                  <Text
                    style={[
                      styles.cell,
                      styles.cellSituation(item.FLAGPRODLINHA),
                    ]}
                  >
                    {item.FLAGDESCPRODLINHA}
                  </Text>
                  <Text style={styles.cell}>{item.IDPROLINHA}</Text>
                  <Text style={styles.cell}>{item.DESCLINHA}</Text>
                  <Text style={styles.cell}>
                    {formatDate(item.DATAINIPRODLINHA)}
                  </Text>
                  <Text style={styles.cell}>
                    {removeHourZeros(item.HORAINIPRODLINHA)}
                  </Text>
                  <Text style={styles.cell}>
                    {formatDate(item.DATAFIMPRODLINHA)}
                  </Text>
                  <Text style={styles.cell}>
                    {removeHourZeros(item.HORAFIMPRODLINHA)}
                  </Text>
                  <Text style={styles.cell}>{item.MINPRODHORAPRODLINHA}</Text>
                  <Text style={styles.cell}>{item.REFFICHAPROD}</Text>
                  <Text style={styles.cell}>{item.DESFORMATO}</Text>
                  <Text style={styles.cell}>{item.NOMEUSU}</Text>
                </TouchableOpacity>
              );
            }}
            setState={setSelected}
            state={selected}
          />

          <View
            style={{
              flexDirection: 'row',
            }}
          >
            <Button
              size="large"
              icon={<Feather name="save" color={'white'} size={25} />}
              text="Adicionar"
              onPress={() => router.push('/reference/1')}
            />
            <Button
              size="large"
              icon={<Feather name="pause" color={'white'} size={25} />}
              text="Pausar Produção"
              onPress={() => router.push('/reference/2')}
              color={theme.colors.orange.button}
            />
          </View>
        </>
      )}
    </View>
  );
}

export const styles = StyleSheet.create<TStyles | any>({
  cell: {
    color: 'black',
    fontSize: 16,
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

import React, { useMemo, useRef, useState } from 'react';
import { FieldValues, SubmitHandler } from 'react-hook-form';
import { ActivityIndicator, Alert } from 'react-native';
import { FlatList, View, Text } from 'react-native';
import { useQuery } from 'react-query';

import Button from '@/components/Button';
import Loading from '@/components/Loading';
import Modal, { ComportModalProps } from '@/components/Modal';
import StepModal from '@/components/StepModal';
import { TextInput } from '@/components/TextInput';
import { useCredentialStore, useFilterStore } from '@/store/filterStore';
import { format } from 'date-fns';
import { useTheme } from 'styled-components/native';
import { api } from 'util/axios/axios';
import { formatDate } from 'util/functions/formatDate';
import { removeHourZeros } from 'util/functions/functionHours';

import { getAllDataURL, postDataURL, putCancelURL } from './api-urls';
import { CardStop } from './components/CardStop';
import { StepOne, StepTwo, schema } from './components/Modals';
import {
  dateRetroactive,
  handlePresentModalPressShow,
  handlePresentModalPressSteps,
} from './functions';
import { StoppedAppointmentRequest } from './types';

import * as S from './styles';

export default function StopAppointmentLayout() {
  const { credential } = useCredentialStore();
  const bottomSheetModalRefShow = useRef<ComportModalProps>(null);
  const bottomSheetModalRefStep = useRef<ComportModalProps>(null);
  const snapPoints = useMemo(() => ['40%', '95%'], []);
  const snapPointSteps = useMemo(() => ['40%', '70%'], []);
  const [isLoadingModal, setIsLoadingModal] = useState(false);
  const [filterValue, setFilterValue] = useState<StoppedAppointmentRequest>([]);
  const { filters } = useFilterStore();
  const theme = useTheme();

  const { data, isLoading, refetch, isRefetching } = useQuery(
    'query_appointament_stop',
    async () => {
      const request = await api.get<StoppedAppointmentRequest>(
        getAllDataURL(
          filters?.unit.value as number,
          filters?.line.value as number,
          dateRetroactive(),
          format(new Date(), 'dd/MM/yyyy'),
          30
        )
      );

      return request.data;
    }
  );

  const onSubmit: SubmitHandler<FieldValues> = async (
    data: typeof schema.fields
  ) => {
    bottomSheetModalRefStep.current?.handleDismiss();
    const body = {
      checkeficienciamotivoparada: 1,
      datafimparada: data.finalDate
        ? data.finalDate
        : format(new Date(), 'yyyy-MM-dd'),
      datainiparada: data.initialDate
        ? data.initialDate
        : format(new Date(), 'yyyy-MM-dd'),
      dataparada: null,
      desclinha: null,
      descmotivoparada: null,
      desctempoparada: null,
      flagdescparada: null,
      flagparada: 0,
      horafimparada: data.finalHour,
      horainiparada: data.initialHour,
      horaparada: null,
      horastotalparada: null,
      idfichaprod: data.product.value,
      idlinha: filters?.line.value,
      idlinhaequip: data.equipment.value,
      idmotivoparada: data.motiveStopped.value,
      idparada: 0,
      idproducaoefi: 0,
      idunidade: filters?.unit.value,
      idusuario: credential?.userid || '0',
      obsparada: data.observation || '',
      sincparada: 0,
      tempominparada: data.timeInMinutes || '0',
      tipoparadaparada: data.typeStopped.value,
    };

    try {
      const response = await api.post(postDataURL(), body);
      if (response.status == 200) {
        Alert.alert('', 'Enviado com sucesso.');
      }
    } catch (err) {
      Alert.alert('Erro:', err.message);
      console.log(err.message);
    }
    refetch();
    return data;
  };

  const handleFilter = (value: number) => {
    const filter = data?.filter((item) => item.IDPARADA == value);

    if (!filter) {
      return Alert.alert('Dado não encontrado!', '');
    }

    handlePresentModalPressShow(
      bottomSheetModalRefShow,
      bottomSheetModalRefStep
    );

    setFilterValue(filter!);
    setIsLoadingModal(false);
    return;
  };

  const handleInactive = (value: number) => {
    return value === 0 ? false : true;
  };

  const handleCancel = async (id: number, flag: number) => {
    if (flag == 1) {
      Alert.alert('Ação interrompida!', 'Não é possivel cancelar este dado');
      return bottomSheetModalRefShow.current?.handleDismiss();
    }

    Alert.alert(
      'Deseja cancelar ?',
      `Realmente deseja cancelar o registro n° ${id}`,
      [
        {
          text: 'Sim',
          onPress: async () => {
            const response = await api.put(putCancelURL(id));
            if (response.status != 200) {
              Alert.alert('', 'Deu algum erro');
            }
            Alert.alert('', 'Registro cancelado com sucesso');
            setFilterValue([]);
            refetch();
            return bottomSheetModalRefShow.current?.handleDismiss();
          },
        },
        {
          style: 'cancel',
          text: 'Não',
        },
      ]
    );
  };

  const RenderItem = ({ item }) => {
    return (
      <CardStop.Wrapper
        onPress={() => (setIsLoadingModal(true), handleFilter(item.IDPARADA))}
      >
        <CardStop.Icon isInactivatedItem={handleInactive(item.FLAGPARADA)} />
        <CardStop.YStack>
          <CardStop.Text title="Código: " text={item.IDPARADA} />
          <CardStop.XStack>
            <CardStop.DataText
              title="Início: "
              text={`${formatDate(item.DATAINIPARADA)} ${removeHourZeros(
                item.HORAINIPARADA
              )}`}
            />
          </CardStop.XStack>
          <CardStop.XStack>
            <CardStop.DataText
              title="Fim "
              text={`${formatDate(item.DATAFIMPARADA)} ${removeHourZeros(
                item.HORAFIMPARADA
              )}`}
            />
          </CardStop.XStack>
        </CardStop.YStack>
      </CardStop.Wrapper>
    );
  };

  return (
    <>
      {isLoading || isRefetching ? (
        <Loading />
      ) : (
        <S.Root.Wrapper>
          <FlatList
            data={data}
            ItemSeparatorComponent={ListItemSeparator}
            renderItem={RenderItem}
          />

          <Button
            text="Apontar"
            onPress={() =>
              handlePresentModalPressSteps(
                bottomSheetModalRefStep,
                bottomSheetModalRefShow
              )
            }
          />

          <Modal snapPoints={snapPoints} ref={bottomSheetModalRefShow}>
            <>
              {isLoadingModal ? (
                <View
                  style={{
                    alignItems: 'center',
                    gap: 10,
                  }}
                >
                  <ActivityIndicator
                    color={theme.colors.primary[300]}
                    size={40}
                  />
                  <Text>Carregando...</Text>
                </View>
              ) : (
                <S.Root.WrapperModal>
                  <TextInput.Wrapper label="Status" />
                  <CardStop.Icon
                    isInactivatedItem={handleInactive(
                      filterValue[0]?.FLAGPARADA
                    )}
                  />
                  <TextInput.Wrapper label="Equip. Causou Parada">
                    <TextInput.Content
                      editable={false}
                      value={filterValue[0]?.DESCLINHA}
                    />
                  </TextInput.Wrapper>
                  <TextInput.Wrapper label="Motivo">
                    <TextInput.Content
                      editable={false}
                      multiline
                      value={filterValue[0]?.DESCMOTIVOPARADA}
                    />
                  </TextInput.Wrapper>
                  <TextInput.Wrapper label="Data/Hora Inicio">
                    <TextInput.Content
                      editable={false}
                      value={`${filterValue[0]?.DATAINIPARADA} ${filterValue[0]?.HORAINIPARADA}`}
                    />
                  </TextInput.Wrapper>
                  <TextInput.Wrapper label="Data/Hora Fim">
                    <TextInput.Content
                      editable={false}
                      value={`${filterValue[0]?.DATAFIMPARADA} ${filterValue[0]?.HORAFIMPARADA}`}
                    />
                  </TextInput.Wrapper>
                  <TextInput.Wrapper label="Tempo (min)">
                    <TextInput.Content
                      editable={false}
                      value={filterValue[0]?.TEMPOMINPARADA + ''}
                    />
                  </TextInput.Wrapper>
                  <TextInput.Wrapper label="Observação">
                    <TextInput.Content
                      editable={false}
                      multiline
                      value={filterValue[0]?.OBSPARADA}
                    />
                  </TextInput.Wrapper>
                  {!handleInactive(filterValue[0]?.FLAGPARADA) && (
                    <Button
                      text="Cancelar"
                      color={theme.colors.orange.button}
                      onPress={() =>
                        handleCancel(
                          filterValue[0].IDPARADA,
                          filterValue[0].FLAGPARADA
                        )
                      }
                    />
                  )}
                </S.Root.WrapperModal>
              )}
            </>
          </Modal>
          <Modal snapPoints={snapPointSteps} ref={bottomSheetModalRefStep}>
            <S.Root.WrapperModal>
              <StepModal
                onSubmit={onSubmit}
                schema={schema}
                steps={[StepOne, StepTwo]}
              />
            </S.Root.WrapperModal>
          </Modal>
        </S.Root.Wrapper>
      )}
    </>
  );
}

export const ListItemSeparator = () => {
  return <View style={{ height: 10 }} />;
};

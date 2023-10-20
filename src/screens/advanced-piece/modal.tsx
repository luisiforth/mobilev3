import { useState, useCallback } from 'react';
import { FieldValues, SubmitHandler } from 'react-hook-form';
import { Alert } from 'react-native';

import Button from '@/components/Button';
import StepModal from '@/components/StepModal';
import useRealmCrud from '@/hooks/useCrud';
import { useNetInfo } from '@/hooks/useNetInfo';
import { useFilterStore } from '@/store/filterStore';
import { api } from 'util/axios/axios';
import { Historic_advanced_piece } from 'util/realm/schema/historic_advanced_piece';

import { postAdvPiece } from './api-urls';
import { StepCamera, StepOne, StepTwo, schema } from './modals';

type ModalProps = {
  refetch: () => void;
};

export function Modal({ refetch }: ModalProps) {
  const [modalVisible, setModalVisible] = useState(false);
  const { filters } = useFilterStore();
  // const { defects } = useDefectsStore();
  const isConnected = useNetInfo();
  const { createRecord } = useRealmCrud(
    'historic_advanced_piece',
    //@ts-ignore
    Historic_advanced_piece.generate
  );

  const openModal = useCallback(() => {
    setModalVisible(!modalVisible);
  }, [modalVisible]);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (filters == null) {
      Alert.alert(
        'Não há dados na unidade e linha',
        'Favor selecionar unidade e linha para progredir.'
      );
      return;
    }

    const body = {
      IDUSUARIO: 3, //Alterar para o usuário LOGADO.
      IDUNIDADE: filters.unit,
      IDLINHA: filters.line,
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
      await createRecord(body);
      // openModal();
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
    <>
      <Button text="Apontamento" onPress={openModal} />
      <ModalCustom.Wrapper
        onBackdropPress={openModal}
        isVisible={modalVisible}
        onSwipeComplete={openModal}
      >
        <ModalCustom.Header />
        <StepModal
          onSubmit={onSubmit}
          schema={schema}
          steps={[StepCamera, StepOne, StepTwo]}
        />
      </ModalCustom.Wrapper>
    </>
  );
}

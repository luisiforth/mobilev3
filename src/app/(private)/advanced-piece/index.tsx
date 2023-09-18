import { useCallback, useState } from 'react';
import { View, FlatList, Text } from 'react-native';
import Modal from 'react-native-modal';

import Button from '@/components/Button';
import StepModal from '@/components/StepModal';

import { onSubmit } from './handle-submit';

import * as S from './styles';

export default function AdvancedPiece() {
  const [modalVisible, setModalVisible] = useState(false);
  const openModal = useCallback(() => {
    setModalVisible(!modalVisible);
  }, [modalVisible]);

  const closeModal = useCallback(() => {
    setModalVisible(!modalVisible);
  }, [modalVisible]);

  return (
    <S.Root.Wrapper>
      <S.Root.WrapperFlatList>
        <FlatList data={[]} renderItem={RenderItem} />
      </S.Root.WrapperFlatList>

      <Modal
        isVisible={modalVisible}
        onSwipeComplete={closeModal}
        backdropColor="#2E2F42"
        backdropOpacity={0.8}
        swipeDirection={['down']}
        style={{
          justifyContent: 'flex-end',
          margin: 0,
        }}
      >
        <StepModal onSubmit={onSubmit} schema={{}} steps={[]} />

        <Text style={{ backgroundColor: 'red' }}> AAAAAAA AAAA AAA </Text>
      </Modal>
      <Button text="Apontamento" onPress={openModal} />
    </S.Root.Wrapper>
  );
}

export function RenderItem() {
  return (
    <View>
      <Text> AAAAA </Text>
      <Text> AAAAA </Text>
      <Text> AAAAA </Text>
      <Text> AAAAA </Text>
      <Text> AAAAA </Text>
      <Text> AAAAA </Text>
    </View>
  );
}

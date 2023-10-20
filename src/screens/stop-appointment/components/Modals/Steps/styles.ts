import { Image } from 'expo-image';
import styled from 'styled-components/native';

const Wrapper = styled.View`
  flex: 1;
  margin: 0;
  z-index: 0;
  padding: 15px;
  gap: ${({ theme }) => theme.spacings[10]};
`;

const WrapperSteps = styled.View`
  gap: ${({ theme }) => theme.spacings[10]};
`;
const Container = styled.View`
/* //Arrumar isso */
  flex-direction: row;
  width: 48%;
  gap: ${({ theme }) => theme.spacings[10]};
`;

const WrapperFlatList = styled.View`
  flex: 1;
`;

const ImageContentModal = styled(Image)`
  border-radius: 6px;
  height: 400px;
`;

const ContainerRenderItem = styled.View`
  align-items: center;
  flex-direction: row;
  gap: ${({ theme }) => theme.spacings[20]};
`;

const ContainerRenderItemText = styled.View`
  gap: ${({ theme }) => theme.spacings[10]};
`;

const Text = styled.Text`
  font-weight: ${({ theme }) => theme.font.bold};
`;

const Touchable = styled.TouchableOpacity`
  border-radius: 6px;
  border: 3px dashed ${({ theme }) => theme.colors.primary[300]};
`;

export const Root = {
  ContainerRenderItem: ContainerRenderItem,
  ContainerRenderItemText: ContainerRenderItemText,
  ImageContentModal: ImageContentModal,
  Text: Text,
  Touchable: Touchable,
  Wrapper: Wrapper,
  WrapperFlatList: WrapperFlatList,
  WrapperSteps: WrapperSteps,
  Container: Container,
  // BarTop: BarTop
};

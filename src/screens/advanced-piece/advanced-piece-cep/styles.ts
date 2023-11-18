import { Dimensions } from 'react-native';

import { Image } from 'expo-image';
import styled from 'styled-components/native';

const { width } = Dimensions.get('window');

const Wrapper = styled.TouchableOpacity`
  flex: 1;
  align-items: center;
  z-index: 0;
  padding: 0 ${({ theme }) => theme.spacings[20]}
    ${({ theme }) => theme.spacings[20]} ${({ theme }) => theme.spacings[20]};
  gap: ${({ theme }) => theme.spacings[10]};
`;

const ImageContent = styled(Image)`
  border-radius: 6px;
  height: ${width * 0.6}px;
  width: ${width * 0.6}px;
`;

const ImageContentModal = styled(Image)`
  align-self: center;
  border-radius: 6px;
  padding: 50px;
  width: 350px;
  height: 450px;
`;

const Touchable = styled.TouchableOpacity`
  border-radius: 6px;
  padding: 5px;
  border: 3px dashed ${({ theme }) => theme.colors.primary[300]};
`;

export const Root = {
  ImageContent: ImageContent,
  ImageContentModal: ImageContentModal,
  Touchable: Touchable,
  Wrapper: Wrapper,
};

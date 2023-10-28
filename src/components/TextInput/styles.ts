import { BottomSheetTextInput } from '@gorhom/bottom-sheet';
import styled from 'styled-components/native';

const Wrapper = styled.View`
  position: relative;
`;

const ContentWrapper = styled.View`
  align-items: center;
  /* border: 1px solid black; */
  flex-direction: row;
`;

const Error = styled.Text`
  color: red;
`;

const Text = styled.Text`
  font-size: 17px;
  padding-bottom: 6px;
  color: ${({ theme }) => theme.colors.black};
`;

const Icon = styled.TouchableOpacity`
  position: absolute;
  right: 0;
  z-index: 1;
  padding: 10px;
`;

const Input = styled.TextInput`
  width: 100%;
  position: relative;
  padding: 10px;
  border-radius: ${({ theme }) => theme.border.radius[4]};
  font-size: 16px;
  border: ${({ focusable }) => (focusable ? '2px' : '1px')} solid
    ${({ theme, focusable }) =>
      focusable ? theme.colors.primary.ring : theme.colors.black};
  color: ${({ theme }) => theme.colors.black};
`;
const InputModal = styled(BottomSheetTextInput)`
  width: 100%;
  position: relative;
  padding: 10px;
  border-radius: ${({ theme }) => theme.border.radius[4]};
  font-size: 16px;
  border: ${({ focusable }) => (focusable ? '2px' : '1px')} solid
    ${({ theme, focusable }) =>
      focusable ? theme.colors.primary.ring : theme.colors.black};
  color: ${({ theme }) => theme.colors.black};
`;

export const Root = {
  ContentWrapper: ContentWrapper,
  Error: Error,
  Icon: Icon,
  InputModal: InputModal,
  Input: Input,
  Text: Text,
  Wrapper: Wrapper,
};

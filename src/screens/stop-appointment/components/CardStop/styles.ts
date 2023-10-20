import styled from 'styled-components/native';

const Wrapper = styled.TouchableOpacity`
  border: 1px solid black;
  flex-direction: row;
  background: white;
  border-radius: ${({ theme }) => theme.border.radius[6]};
  padding: ${({ theme }) => theme.spacings[10]};
  gap: ${({ theme }) => theme.spacings[10]};
`;

const YStack = styled.View`
  justify-content: center;
  gap: ${({ theme }) => theme.spacings[4]};
`;

const XStack = styled.View`
  justify-content: space-between;
  flex-direction: row;
  gap: ${({ theme }) => theme.spacings[10]};
`;

type TextTProps = {
  color: string;
};

const Text = styled.Text<TextTProps>`
  font-size: ${({ theme }) => theme.font.sizes.md};
  color: ${({ color }) => (color ? color : 'black')};
`;

const TextData = styled.Text<TextTProps>`
  font-size: ${({ theme }) => theme.font.sizes.sm};
  color: ${({ color }) => (color ? color : 'black')};
`;

const TextTitle = styled.Text`
  font-size: ${({ theme }) => theme.font.sizes.sm};
  font-weight: ${({ theme }) => theme.font.bold};
`;

const Title = styled.Text`
  font-size: ${({ theme }) => theme.font.sizes.md};
  font-weight: ${({ theme }) => theme.font.bold};
`;

type WrapperIconProps = {
  isInactivatedItem: boolean;
};

const WrapperIcon = styled.View<WrapperIconProps>`
  border-radius: ${({ theme }) => theme.border.radius[6]};
  align-items: center;
  justify-content: center;
  background: ${({ isInactivatedItem, theme }) =>
    isInactivatedItem ? theme.colors.orange['500/50'] : 'white'};
  border: 1px solid
    ${({ isInactivatedItem, theme }) =>
      isInactivatedItem ? theme.colors.orange['500'] : 'white'};
  padding: 0 ${({ theme }) => theme.spacings[10]};
`;

export const Root = {
  Text: Text,
  TextData: TextData,
  TextTitle: TextTitle,
  Title: Title,
  Wrapper: Wrapper,
  WrapperIcon: WrapperIcon,
  XStack: XStack,
  YStack: YStack,
};

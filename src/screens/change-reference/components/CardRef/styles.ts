import styled from 'styled-components/native';
type WrapperSectionProps = {
  color: string;
};

const WrapperSection = styled.View<WrapperSectionProps>`
  align-items: center;
  border-radius: ${({ theme }) => theme.border.radius[6]};
  flex-direction: row;
  padding: ${({ theme }) => theme.spacings[10]};
  gap: ${({ theme }) => theme.spacings[10]};
  background: ${({ color }) => color};
`;

const Wrapper = styled.TouchableOpacity`
  border-radius: ${({ theme }) => theme.border.radius[6]};
  padding: ${({ theme }) => theme.spacings[10]};
  background: white;
  position: relative;
  gap: ${({ theme }) => theme.spacings[1]};
  border: 1px solid ${({ theme }) => theme.colors.primary[500]};
`;

const Bar = styled.View<WrapperSectionProps>`
  position: absolute;
  right: 0;
  top: 0;
  width: 10px;
  height: 86px;
  border-radius: 0 ${({ theme }) => theme.border.radius[4]}
    ${({ theme }) => theme.border.radius[4]} 0;
  background: ${({ color }) => color};
`;

const Title = styled.Text`
  font-size: ${({ theme }) => theme.font.sizes.md};
  font-weight: ${({ theme }) => theme.font.bold};
`;

type TextTProps = {
  color: string;
};

const Text = styled.Text<TextTProps>`
  font-size: ${({ theme }) => theme.font.sizes.md};
  color: ${({ color }) => (color ? color : 'black')};
`;
// const

export const Root = {
  Bar: Bar,
  // Container: Container,
  Text: Text,
  Title: Title,
  Wrapper: Wrapper,
  WrapperSection: WrapperSection,
};

import { Image as ExpoImage } from 'expo-image';
import styled from 'styled-components/native';

export type StyledProps = {
  onAsync: boolean;
};

export const Wrapper = styled.TouchableOpacity<StyledProps>`
  align-items: center;
  background-color: ${({ theme, onAsync }) =>
    !onAsync ? theme.colors.white[500] : theme.colors.orange['500/50']};
  border: 1px solid
    ${({ theme, onAsync }) =>
      !onAsync ? theme.colors.primary[300] : theme.colors.orange[500]};
  border-radius: ${({ theme }) => theme.border.radius[6]};
  flex-direction: row;
  padding: ${({ theme }) => theme.spacings[12]};
  justify-content: space-between;
`;

const Image = styled(ExpoImage)`
  height: 80px;
  width: 80px;
  border-radius: ${({ theme }) => theme.border.radius[6]};
`;

export const Root = {
  Image: Image,
  Wrapper: Wrapper,
};

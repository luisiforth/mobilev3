import { TouchableOpacityProps } from 'react-native';

import * as S from './styles';

type ButtonProps = {
  text: string;
  // type: S.ButtonTypeStyleProps;
} & TouchableOpacityProps;

export default function Button({ text, ...props }: ButtonProps) {
  return (
    <S.Root.Wrapper activeOpacity={0.7} {...props}>
      <S.Root.Text>{text}</S.Root.Text>
    </S.Root.Wrapper>
  );
}

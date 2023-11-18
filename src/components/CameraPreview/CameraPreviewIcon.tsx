import { TouchableOpacityProps } from 'react-native';

import { Feather } from '@expo/vector-icons';
import { useTheme } from 'styled-components/native';

import * as S from './styles';

type CardModulesProps = {
  icon: keyof typeof Feather.glyphMap;
  isCameraShot?: boolean;
} & TouchableOpacityProps;

export default function CameraPreviewIcon({
  icon,
  isCameraShot = false,
  ...props
}: CardModulesProps) {
  const theme = useTheme();
  return (
    <S.Root.Icon isCameraShot={isCameraShot} {...props}>
      <Feather
        name={icon}
        size={25}
        color={isCameraShot ? theme.colors.black : theme.colors.red[500]}
      />
    </S.Root.Icon>
  );
}

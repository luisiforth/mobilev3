import { Feather } from '@expo/vector-icons';
import { useTheme } from 'styled-components/native';

type InputProps = {
  icon: keyof typeof Feather.glyphMap;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
};

export default function CardRefIcon({ icon }: InputProps) {
  const theme = useTheme();

  return <Feather name={icon} size={20} color={theme.colors.black} />;
}

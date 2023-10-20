import { Feather } from '@expo/vector-icons';
// import {Link } from 'expo-router';
import { useTheme } from 'styled-components/native';

export type Href = Record<'pathname', string>;

type InputProps = {
  icon: keyof typeof Feather.glyphMap;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onPress?: (value?: any) => void;
};

export default function CardCepIcon({ icon, onPress }: InputProps) {
  const theme = useTheme();
  return (
    // <Link href={href}>
    <Feather
      onPress={onPress}
      name={icon}
      size={25}
      color={theme.colors.black}
    />
    // </Link>
  );
}

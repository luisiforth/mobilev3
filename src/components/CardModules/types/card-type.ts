import { Feather } from '@expo/vector-icons';

export type CardModulesProps = {
  icon: keyof typeof Feather.glyphMap;
  children: React.ReactNode;
  fn?: () => void;
  title: string;
};

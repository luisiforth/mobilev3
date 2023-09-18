import { Feather } from '@expo/vector-icons';

type CardModule = {
  name: string;
  icon: string;
  href: string;
};

export type CardModulesProps = {
  icon: keyof typeof Feather.glyphMap;
  data: CardModule[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  href: any;
  children: React.ReactNode;
  title: string;
};

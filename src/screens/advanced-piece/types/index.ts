import { GenerateAdvancedPieceProps } from 'util/realm/schema/historic_advanced_piece';

type ComplementarProps = {
  _id: string;
  IDCEPPECAADIANTADA: string;
  FLAG: boolean;
  DATACEPPECAADIANTADA: string;
  HORACEPPECAADIANTADA: string;
};

export type ItemProps = {
  DATA: string;
  HORA: string;
  ID: number;
  IMAGEM: string[];
  TOM: number;
} & ComplementarProps &
  GenerateAdvancedPieceProps;

export type renderItemProps = {
  item: ItemProps;
  index: number;
};

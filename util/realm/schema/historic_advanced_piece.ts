import { format } from 'date-fns';
import Realm from 'realm';

export type GenerateAdvancedPieceProps = {
  BRILHOCEPPECAADIANTADA: number;
  IDDEFEITO: number;
  DESCDEFEITO: string;
  IDLINHA: number;
  IDUNIDADE: number;
  DEFORMADOCEPPECAADIANTADA: number;
  DIFTONCEPPECAADIANTADA: number;
  IDUSUARIO: number;
  IMAGEM: string[];
  OBSCEPPECAADIANTADA: string;
  TEXTURACEPPECAADIANTADA: number;
  TOMCEPPECAADIANTADA: number;
  TONCEPPECAADIANTADA: number;
};

export class Historic_advanced_piece extends Realm.Object {
  BRILHOCEPPECAADIANTADA!: number;
  IDDEFEITO!: number;
  IDLINHA!: number;
  IDUNIDADE!: number;
  DESCDEFEITO!: string;
  DEFORMADOCEPPECAADIANTADA!: number;
  DIFTONCEPPECAADIANTADA!: number;
  DATACEPPECAADIANTADA!: string;
  HORACEPPECAADIANTADA!: string;
  IDUSUARIO!: number;
  IMAGEM!: string[];
  OBSCEPPECAADIANTADA!: string;
  TEXTURACEPPECAADIANTADA!: number;
  TOMCEPPECAADIANTADA!: number;
  TONCEPPECAADIANTADA!: number;

  static generate(props: GenerateAdvancedPieceProps) {
    const currentDateTime = new Date();
    const formattedDate = format(currentDateTime, 'dd/MM/yyyy');
    const formattedTime = format(currentDateTime, 'HH:mm:ss');

    return {
      _id: new Realm.BSON.UUID(),
      DATACEPPECAADIANTADA: formattedDate,
      HORACEPPECAADIANTADA: formattedTime,
      ...props,
    };
  }

  static schema: Realm.ObjectSchema = {
    name: 'historic_advanced_piece',
    primaryKey: '_id',

    properties: {
      _id: 'uuid',
      IDLINHA: 'double',
      IDUNIDADE: 'double',
      IDUSUARIO: 'double',
      IMAGEM: 'string[]',
      DESCDEFEITO: 'string',
      IDDEFEITO: 'double',
      DEFORMADOCEPPECAADIANTADA: 'double',
      DATACEPPECAADIANTADA: 'string',
      HORACEPPECAADIANTADA: 'string',
      DIFTONCEPPECAADIANTADA: 'double',
      OBSCEPPECAADIANTADA: 'string',
      BRILHOCEPPECAADIANTADA: 'double',
      TEXTURACEPPECAADIANTADA: 'double',
      TOMCEPPECAADIANTADA: 'double',
      TONCEPPECAADIANTADA: 'double',
    },
  };
}

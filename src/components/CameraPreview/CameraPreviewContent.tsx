import { ImageProps } from 'expo-image';

import * as S from './styles';

type CardModulesProps = {
  image: string | string[];
} & ImageProps;

export default function CameraPreviewContent({
  image,
  ...props
}: CardModulesProps) {
  return (
    <S.Root.WrapperContent
      {...props}
      source={{ uri: 'data:image/jpg;base64,' + image }}
      contentFit="cover"
    />
  );
}

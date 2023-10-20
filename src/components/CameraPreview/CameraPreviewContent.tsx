import * as S from './styles';

type CardModulesProps = {
  image: string | string[];
};

export default function CameraPreviewContent({ image }: CardModulesProps) {
  return (
    <S.Root.WrapperContent
      source={{ uri: 'data:image/jpg;base64,' + image }}
      contentFit="cover"
    />
  );
}

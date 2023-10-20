import { CameraType } from 'expo-camera';

type FunctionProps = (
  setType: React.Dispatch<React.SetStateAction<CameraType>>
) => void;

export const toggleCameraType: FunctionProps = (setType) => {
  setType((current) =>
    current === CameraType.back ? CameraType.front : CameraType.back
  );
};

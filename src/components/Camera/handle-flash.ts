type Functionprops = (
  setFlashMode: React.Dispatch<React.SetStateAction<number>>
) => void;

export const handleFlashMode: Functionprops = (setFlashMode) => {
  setFlashMode((prevState) => (prevState === 1 ? 0 : 1));
};

import * as FileSystem from 'expo-file-system';

export async function convertBase64(imagePath: string[]) {
  try {
    const imageBase64: string[] = [];

    for (const path of imagePath) {
      const base64 = await FileSystem.readAsStringAsync(path, {
        encoding: FileSystem.EncodingType.Base64,
      });
      imageBase64.push(base64);
    }

    return imageBase64;
  } catch (error) {
    console.error('Erro ao converter para base64:', error);
    throw error;
  }
}

export function baseOrLocalImage(data: string) {
  if (!data) return;
  return !data.startsWith('file') ? 'data:image/jpeg;base64, ' + data : data;
}

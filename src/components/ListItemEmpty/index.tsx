import { Dimensions, Text, View, StyleSheet } from 'react-native';

import { Image } from 'expo-image';

const { width } = Dimensions.get('window');

export const ListItemEmpty = () => {
  return (
    <View style={styles.wrapper}>
      <Image
        source={require('assets/imagEmpty.png')}
        style={{
          borderRadius: 6,
          height: width * 0.5,
          width: width * 0.7,
        }}
      />
      <Text style={styles.title}>Não há dados no momento!</Text>
      <Text style={styles.text}>Utilize o filtro para obter resultados.</Text>
    </View>
  );
};

export const styles = StyleSheet.create({
  text: {
    fontSize: 14,
    marginTop: -15,
  },
  title: {
    color: '#3e3c6c',
    fontSize: 20,
    fontWeight: '600',
  },
  wrapper: {
    alignItems: 'center',
    flex: 1,
    gap: 20,
    // justifyContent: 'center',
    padding: 20,
  },
});

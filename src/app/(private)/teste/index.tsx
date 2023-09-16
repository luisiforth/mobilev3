import { View, StyleSheet } from 'react-native';

import { CardModules } from '@/components/CardModules';
import { Header } from '@/components/Header';
import Search from '@/components/Search';
import { fontSizes } from '@/constants';
import { useNavigation } from 'expo-router';

// import { COLORS } from '@/constants';

export default function Home() {
  const router = useNavigation();
  console.log({ router });
  return (
    <View style={styles.container}>
      <Header.Wrapper>
        <View>
          <Header.Text text="Olá" />
          <Header.Title title="TESTE (Não Inativar)" />
        </View>
        <Header.Image />
      </Header.Wrapper>
      <Search placeholder="Buscar ..." />

      <View>
        <CardModules.Wrapper>
          <CardModules.Title title="Teste" />
        </CardModules.Wrapper>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 20,
    padding: 20,
  },
  text: {
    fontSize: fontSizes.sm,
  },
});

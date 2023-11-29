import {
  FlatList,
  ImageStyle,
  ScrollView,
  TextStyle,
  TouchableOpacity,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';

type TTableOption = {
  data: [];
  head: string[];
  children: React.ReactNode;
};

export default function table({ data, head, chil }: TTableOption) {
  return (
    <ScrollView
      disableIntervalMomentum
      horizontal
      showsHorizontalScrollIndicator={false}
    >
      <TouchableOpacity activeOpacity={0.8} style={{ zIndex: 0 }}>
        <View style={styles.header}>
          {head.map((value, index) => (
            <Text key={index} style={styles.headerItem}>
              {value}
            </Text>
          ))}
        </View>
        <View style={{ flex: 1 }}>
          <FlatList
            style={{ flex: 1, backgroundColor: 'yellow' }}
            data={data}
            // ListEmptyComponent={ListItemEmpty}
            renderItem={children}
          />
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
}

export const styles = StyleSheet.create({
  cell: {
    color: 'black',
    flex: 1,
    fontSize: 14,
    textAlign: 'center',
    width: 200,
  },
  cellSituation: (isActive: boolean): ViewStyle => ({
    backgroundColor: isActive ? 'red' : 'green',
  }),
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  headerItem: {
    borderColor: 'black',
    color: 'black',
    flex: 1,
    fontSize: 16,
    textAlign: 'center',
    width: 200,
  },
  row: {
    // flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'black',
    paddingVertical: 10,
  },
  spaceCell: (index: number) => ({
    backgroundColor: index % 2 && 'gray',
  }),
});

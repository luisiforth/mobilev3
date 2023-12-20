import React, { useCallback, memo, useState, useEffect } from 'react';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  View,
  // Modal,
  FlatList,
} from 'react-native';
import Modal from 'react-native-modal';

import { COLORS } from '@/constants';
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import {
  BottomSheetFlatList,
  // TouchableOpacity as TouchableOpacityModal,
} from '@gorhom/bottom-sheet';
import { BottomSheetFlatListProps } from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetScrollable/types';

import Loading from '../Loading';
// import Modal, { ComportModalProps } from '../Modal';

type TSelect = {
  label: string | number;
  value: string | number;
};

type TMultiSelect = {
  item: TSelect[];
  placeholder?: string;
  placeholderSearch?: string;
  flatListProps?: Omit<BottomSheetFlatListProps<any>, 'renderItem' | 'data'>;
  isMulti?: boolean;
  isSearch?: boolean;
  value: any;
  setValue?: (value: TSelect[] | TSelect) => void;
  onChange?: (value: any) => void | undefined;
  isLoading?: boolean;
};

function Select(props: TMultiSelect) {
  const {
    item,
    value,
    placeholder = 'Selecione',
    placeholderSearch = 'Buscar ...',
    isMulti = false,
    isSearch = false,
    setValue,
    onChange,
    // flatListProps,
  } = props;

  const [visible, setVisible] = useState(false);
  const [plus, setPlus] = useState(12);
  const [data, setData] = useState<TSelect[]>([]);
  const [selected, setSelected] = useState<TSelect[]>(() => {
    if (value) {
      if (value instanceof Array) {
        return value;
      } else {
        return [value];
      }
    } else {
      return []; // Set a default value if needed
    }
  });
  const handleOpen = useCallback(() => {
    // if (isLoading) return;
    setVisible((prev) => !prev);
  }, [visible]);

  useEffect(() => {
    handleData();
  }, [plus]);

  useEffect(() => {
    if (!setValue) return;

    if (!isMulti) return setValue(selected[0]);
    setValue(selected);
    if (onChange) return onChange(selected);
  }, [selected]);

  const handleData = useCallback(() => {
    if (plus > item.length) return;
    const value = item.slice(0, plus);

    return setData(value);
  }, [plus]);

  const handlePlus = () => {
    return setPlus((prev) => prev + 5);
  };

  const handleFilter = useCallback(
    (data: TSelect) => {
      const find = selected.filter((v) => v.value == data.value);

      return { length: find.length > 0, data: find };
    },
    [selected]
  );

  const handleSelected = useCallback(
    (data: TSelect) => {
      if (handleFilter(data).length) return handleRemove(data);
      if (isMulti) {
        setSelected((prev) => [...prev, data]);

        return;
      }
      setSelected([data]);

      return handleOpen();
    },
    [selected]
  );

  const handleRemove = useCallback(
    (data: TSelect) => {
      const newData = selected.filter((item) => item.value !== data.value);
      return setSelected(newData);
    },
    [selected]
  );

  const handleSearch = useCallback(
    (text: string) => {
      if (text == undefined) return;

      const find = item.filter((v) =>
        Object.values(v).some(
          (valor) =>
            typeof valor === 'string' &&
            valor.toLowerCase().includes(text.toLowerCase())
        )
      );

      setData(find);
      return;
    },
    [data]
  );
  return (
    <>
      <TouchableOpacity style={styles.searchBar} onPress={handleOpen}>
        <View style={{ alignItems: 'center', flexDirection: 'row' }}>
          <MaterialIcons
            style={styles.icon}
            color="black"
            name="search"
            size={25}
          />
          <Text style={{ color: 'black', fontSize: 16 }}>
            {isMulti == false && selected.length != 0
              ? selected[0].label
              : placeholder}
          </Text>
        </View>
        <MaterialIcons
          style={styles.iconFloat}
          color="black"
          name={'keyboard-arrow-down'}
          size={20}
        />
      </TouchableOpacity>
      {selected.length > 0 && isMulti && (
        <View style={{ height: 150 }}>
          <FlatList
            data={selected}
            keyExtractor={(item) => item.value.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={{
                  alignItems: 'center',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  padding: 10,
                  zIndex: 5,
                }}
                activeOpacity={0.9}
                onPress={() => handleRemove(item)}
              >
                <Text style={{ width: 200 }}>{item.label}</Text>
                <MaterialIcons
                  style={styles.icon}
                  color="red"
                  name="close"
                  size={15}
                />
              </TouchableOpacity>
            )}
          />
        </View>
      )}
      <Modal
        style={{
          justifyContent: 'center',
        }}
        onBackdropPress={() => handleOpen()}
        isVisible={visible}
      >
        <View
          style={[
            {
              backgroundColor: 'white',
              borderColor: 'black',
              borderWidth: 1,
              height: 350,
            },
          ]}
        >
          <View style={styles.modalContent}>
            <TouchableOpacity onPress={() => handleOpen()} hitSlop={20}>
              {/* <AntDesign
                style={[styles.icon, { alignSelf: 'flex-end' }]}
                color={'black'}
                name={'close'}
                size={20}
              /> */}
            </TouchableOpacity>
            {isSearch && (
              <TextInput
                placeholder={placeholderSearch}
                onChangeText={handleSearch}
                style={styles.input}
              />
            )}
            <BottomSheetFlatList
              data={data}
              ItemSeparatorComponent={() => <View style={{ height: 5 }} />}
              ListEmptyComponent={<Loading />}
              onEndReached={handlePlus}
              keyExtractor={(item) => item.value.toString()}
              renderItem={({ item }) => {
                return (
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => handleSelected(item)}
                    style={[
                      styles.itemsModal,
                      {
                        backgroundColor: handleFilter(item).length
                          ? COLORS.gray['200']
                          : 'transparent',
                      },
                    ]}
                  >
                    <Text style={{ fontSize: 16 }}>{item.label}</Text>

                    <AntDesign
                      style={styles.icon}
                      color={!handleFilter(item).length ? 'black' : 'red'}
                      name={!handleFilter(item).length ? 'plus' : 'minus'}
                      size={18}
                    />
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        </View>
      </Modal>
    </>
  );
}

export const styles = StyleSheet.create({
  icon: {
    paddingHorizontal: 10,
  },
  iconFloat: {
    paddingHorizontal: 10,
    position: 'absolute',
    right: 0,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: 'black',
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 20,
    paddingVertical: 10,
  },
  itemsModal: {
    borderRadius: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  modalContent: {
    flex: 1,
    padding: 10,
  },
  searchBar: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
});

export default memo(Select);

import React from 'react';
import { Controller, Control } from 'react-hook-form';
import { StyleSheet, Keyboard } from 'react-native';
import { MultiSelect } from 'react-native-element-dropdown';

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
  name: string;
  placeholder?: string;
  placeholderSearch?: string;
  isSearched?: boolean;
  item: {
    label: string | number;
    value: string | number;
  }[];
  icon: (visible?: boolean) => JSX.Element | null | undefined;
  onValueChanged?: (val: any) => void;
};

export function ControlledMultiSelect({
  control,
  name,
  icon,
  item,
  placeholder,
  isSearched,
  placeholderSearch,
  onValueChanged,
}: Props) {
  const [selected, setSelected] = React.useState<string[]>([]);
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <MultiSelect
          style={styles.dropdown}
          onFocus={() => Keyboard.dismiss()}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          search={isSearched}
          data={item}
          labelField="label"
          valueField="value"
          placeholder={placeholder}
          searchPlaceholder={placeholderSearch}
          value={selected ? selected : value}
          onChange={(val) => {
            const result = val.map((value) =>
              item.find((object) => object.value == value)
            );
            setSelected(val);
            onChange(result);
            if (onValueChanged) {
              onValueChanged(result);
            }
          }}
          renderLeftIcon={icon}
          selectedStyle={styles.selectedStyle}
        />
      )}
    />
  );
}

export const styles = StyleSheet.create({
  dropdown: {
    borderWidth: 0,
    height: 50,
    paddingHorizontal: 15,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    height: 20,
    width: 20,
  },
  inputSearchStyle: {
    fontSize: 16,
    height: 60,
  },
  icon: {
    marginRight: 15,
  },
  selectedStyle: {
    borderRadius: 12,
    color: 'black',
    margin: 5,
    padding: 10,
  },
});

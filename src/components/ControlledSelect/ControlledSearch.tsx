import React from 'react';
import { Controller, Control } from 'react-hook-form';
import { StyleSheet, Keyboard } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
  name: string;
  placeholder?: string;
  placeholderSearch?: string;
  item: {
    label: string | number;
    value: string | number;
  }[];
  icon: (visible?: boolean) => JSX.Element | null | undefined;
  onValueChanged?: (val: any) => void;
};

export function ControlledSelectSearch({
  control,
  name,
  icon,
  item,
  placeholder,
  placeholderSearch,
  onValueChanged,
}: Props) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        // {console.log(value)}
        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          onFocus={() => Keyboard.dismiss()}
          iconStyle={styles.iconStyle}
          data={item}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={placeholder}
          searchPlaceholder={placeholderSearch}
          value={value}
          onChange={(val) => {
            const result = item.find((v) => val.value === v.value);
            onChange(val);
            if (onValueChanged) {
              onValueChanged(result);
            }
          }}
          renderLeftIcon={icon}
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

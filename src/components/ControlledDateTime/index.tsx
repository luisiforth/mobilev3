import React from 'react';
import { Controller, Control } from 'react-hook-form';

import DateTimePicker, { AndroidNativeProps } from '@react-native-community/datetimepicker';

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
  name: string;
  mode?: 'time' | 'date';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChangeDate?: (val: any) => void;
  maximumDate?: Date;
  minimumDate?: Date;
};

export function ControlledDateTime({
  control,
  name,
  mode,
  onChangeDate,
  maximumDate,
  minimumDate,
  // onValueChanged: () => void,
  ...props
}: Props) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <>
          <DateTimePicker
            value={value ? new Date(value) : new Date()}
            onChange={(_, date) => {
              onChange(date);
              if (onChangeDate) {
                return onChangeDate(date);
              }
            }}
            maximumDate={maximumDate}
            minimumDate={minimumDate}
            is24Hour={true}
            locale="pt-BR"
            mode={mode}
            {...props}
          />
        </>
      )}
    />
  );
}

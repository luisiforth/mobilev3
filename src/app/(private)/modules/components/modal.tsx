import { useForm } from 'react-hook-form';
import { View, StyleSheet } from 'react-native';
import { useMutation, useQuery } from 'react-query';

import Button from '@/components/Button';
import { ControlledSelect } from '@/components/ControlledSelect';
import { ModalCustom } from '@/components/Modal';
import { Select } from '@/components/Select';
import { yupResolver } from '@hookform/resolvers/yup';
import { api } from 'util/axios/axios';
import { addLabelAndValue } from 'util/handle-options-props';

import { getLineAll, getUnitAll } from '../api-urls';
import { onSubmit } from '../handle-submit';
import { schema } from '../schema';
import { OptionLineProps, OptionUnitProps } from '../types';

export function Modal() {
  const methods = useForm({
    resolver: yupResolver(schema),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = methods;

  const { data } = useQuery(
    'query_unit',
    async () => {
      const response = await api.get<OptionUnitProps[]>(getUnitAll('3'));
      return response.data;
    },
    {
      cacheTime: 0,
    }
  );

  const { mutate, data: response_line } = useMutation({
    mutationFn: async (unit: number) => {
      const response = await api.get<OptionLineProps[]>(getLineAll('3', unit));
      return response.data;
    },
    mutationKey: ['get_mutate_line'],
  });

  const optionUnit = data
    ? addLabelAndValue(data, 'descunidade', 'idunidade')
    : [];

  const optionLine = response_line
    ? addLabelAndValue(response_line, 'desclinha', 'idlinha')
    : [];

  return (
    <ModalCustom.Wrapper>
      <ModalCustom.Header />
      <Select.Wrapper error={errors.unit} label="Unidade *">
        <ControlledSelect
          item={optionUnit}
          name="unit"
          control={control}
          placeholder="Escolha uma unidade"
          onValueChanged={(value) => mutate(value)}
        />
      </Select.Wrapper>

      <Select.Wrapper error={errors.line} label="Linha *">
        <ControlledSelect
          item={optionLine}
          name="line"
          control={control}
          placeholder="Escolha uma linha"
        />
      </Select.Wrapper>
      <Button text="Filtrar" onPress={handleSubmit(onSubmit)} />
    </ModalCustom.Wrapper>
  );
}

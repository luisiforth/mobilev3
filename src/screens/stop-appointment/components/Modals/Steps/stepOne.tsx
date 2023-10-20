import { UseFormReturn } from 'react-hook-form';
import { useMutation, useQuery } from 'react-query';

import { ControlledSelect } from '@/components/ControlledSelect';
import { Select } from '@/components/Select';
import { useOnRequired } from '@/hooks/useOnRequired';
import {
  getLinesURL,
  getProductURL,
  getTypeStoppedsURL,
  getWhySoppedURL,
} from '@/screens/stop-appointment/api-urls';
import {
  Option_equipment,
  Option_product,
  Option_reason_stopped,
  Option_type_stoppeds,
} from '@/screens/stop-appointment/types';
import { useFilterStore } from '@/store/filterStore';
import { api } from 'util/axios/axios';
import { addLabelAndValue } from 'util/handle-options-props';

import * as S from './styles';

interface StepProps {
  methods: UseFormReturn;
  onRequired: (value?: unknown) => boolean;
}

export const StepOne = ({ methods, onRequired }: StepProps) => {
  const { filters } = useFilterStore();
  useOnRequired(['equipment', 'motiveStopped', 'product', 'typeStopped'], {
    methods,
    onRequired,
  });

  const type_stopped_mutate = useMutation(
    'mutate_type_stopped',
    async (id: number) => {
      const response = await api.get<Option_reason_stopped[]>(
        getWhySoppedURL(id)
      );
      return response.data;
    }
  );

  const query_equipment = useQuery('query_equipment', async () => {
    const response = await api.get<Option_equipment[]>(
      getLinesURL(filters?.line.value as number)
    );
    return response.data;
  });

  const query_product = useQuery('query_product', async () => {
    const response = await api.get<Option_product[]>(
      getProductURL(filters?.unit.value as number)
    );
    return response.data;
  });

  const query_type_stopped = useQuery('query_type_stopped', async () => {
    const response = await api.get<Option_type_stoppeds[]>(
      getTypeStoppedsURL()
    );
    return response.data;
  });

  const optionEquip = query_equipment.data
    ? addLabelAndValue(query_equipment.data, 'DESCLINHA', 'IDLINHA')
    : [];

  const optionProduct = query_product.data
    ? addLabelAndValue(query_product.data, 'DESCFICHAPROD', 'IDFICHAPROD')
    : [];

  const optionTypeStopped = query_type_stopped.data
    ? addLabelAndValue(
        query_type_stopped.data,
        'DESCTIPOPARADA',
        'IDTIPOPARADA'
      )
    : [];

  const optionReasonStopped = type_stopped_mutate.data
    ? addLabelAndValue(
        type_stopped_mutate.data,
        'DESCMOTIVOPARADA',
        'IDMOTIVOPARADA'
      )
    : [];

  return (
    <S.Root.WrapperSteps>
      <Select.Wrapper required label="Selecione o Equipamento">
        <ControlledSelect
          item={optionEquip}
          placeholder="Selecione o equipamento"
          control={methods.control}
          name="equipment"
        />
      </Select.Wrapper>
      <Select.Wrapper required label="Selecione o Produto">
        <ControlledSelect
          item={optionProduct}
          placeholder="Selecione o Produto"
          control={methods.control}
          name="product"
        />
      </Select.Wrapper>
      <Select.Wrapper required label="Selecione o Tipo da Parada">
        <ControlledSelect
          item={optionTypeStopped}
          placeholder="Selecione o Tipo da Parada"
          control={methods.control}
          onValueChanged={(v) => {
            if (v) {
              return type_stopped_mutate.mutate(v.IDTIPOPARADA);
            }
          }}
          name="typeStopped"
        />
      </Select.Wrapper>
      <Select.Wrapper required label="Selecione o Motivo da Parada ">
        <ControlledSelect
          item={optionReasonStopped}
          enabled={optionReasonStopped.length > 0}
          placeholder="Selecione a Parada"
          control={methods.control}
          name="motiveStopped"
        />
      </Select.Wrapper>
    </S.Root.WrapperSteps>
  );
};

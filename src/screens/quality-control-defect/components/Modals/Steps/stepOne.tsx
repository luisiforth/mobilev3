import { UseFormReturn } from 'react-hook-form';
import { View } from 'react-native';
import { useQuery } from 'react-query';

import { Select } from '@/components/Select';
import { useOnRequired } from '@/hooks/useOnRequired';
import {
  getAllDefects,
  getAllProducts,
} from '@/screens/quality-control-defect/utils';
import { useFilterStore } from '@/store/filterStore';
// import AntDesign from '@expo/vector-icons/AntDesign';
import { missingFilters } from 'util/functions/missingFilters';
import { addLabelAndValue } from 'util/handle-options-props';

interface StepProps {
  methods: UseFormReturn;
  onRequired: (value?: unknown) => boolean;
}

export const StepOne = ({ methods, onRequired }: StepProps) => {
  const { filters } = useFilterStore();
  useOnRequired(['product', 'defects'], {
    methods,
    onRequired,
  });

  const queryProducts = useQuery('query_products', async () => {
    if (filters == null || filters == undefined) {
      missingFilters(!!filters);
    }
    const result = await getAllProducts(filters?.unit?.value);
    const optionProd = result
      ? addLabelAndValue(result, 'DESCRICAO', 'ID', 'REFERENCIA')
      : [];
    return optionProd;
  });

  const queryDefects = useQuery('query_defect_rectif', async () => {
    if (filters == null || filters == undefined) {
      missingFilters(!!filters);
    }
    const result = await getAllDefects();
    const optionProd = result
      ? addLabelAndValue(result, 'DESCRICAO', 'ID')
      : [];
    return optionProd;
  });

  return (
    <View style={{ gap: 10 }}>
      <Select.Wrapper required label="Produto">
        <Select.Select
          isLoading={queryProducts.isLoading}
          item={queryProducts.data || []}
          value={methods.getValues('product')}
          placeholder="Selecione ou pesquise um Produto"
          setValue={(props) => methods.setValue('product', props)}
          isSearch
        />
      </Select.Wrapper>
      <Select.Wrapper required label="Defeito">
        <Select.Select
          isLoading={queryDefects.isLoading}
          item={queryDefects.data || []}
          value={methods.getValues('defects')}
          placeholder="Selecione ou pesquise um Defeito"
          setValue={(props) => methods.setValue('defects', props)}
          onChange={(props) => {
            const result = props?.map(
              (v: { ID: number; DESCRICAO: string }) => ({
                c: 0,
                id: v.ID,
                label: v.DESCRICAO,
                q: 0,
              })
            );
            methods.setValue('values', result);
          }}
          isMulti
          isSearch
        />
      </Select.Wrapper>
    </View>
  );
};

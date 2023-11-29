import { UseFormReturn } from 'react-hook-form';
import { View } from 'react-native';
import { useQuery } from 'react-query';

import { Selects } from '@/components/ControlledSelect';
import { Select } from '@/components/Select';
import { useOnRequired } from '@/hooks/useOnRequired';
import {
  getAllDefects,
  getAllProducts,
} from '@/screens/quality-control-defect/utils';
import { useFilterStore } from '@/store/filterStore';
import AntDesign from '@expo/vector-icons/AntDesign';
import { missingFilters } from 'util/functions/missingFilters';
import { addLabelAndValue } from 'util/handle-options-props';

import { styles } from '../styles';

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
    <View style={{ gap: 10, padding: 10 }}>
      <Select.Wrapper required label="Selecione um Produto">
        <Selects.Search
          item={queryProducts.data || []}
          icon={() => (
            <AntDesign
              style={styles.icon}
              color="black"
              name="search1"
              size={20}
            />
          )}
          name="product"
          control={methods.control}
          placeholderSearch="Pesquisar ..."
          placeholder="Escolha um produto"
        />
      </Select.Wrapper>
      <Select.Wrapper required label="Selecione um Defeito">
        <Selects.MultiSelect
          item={queryDefects.data || []}
          icon={() => (
            <AntDesign
              style={styles.icon}
              color="black"
              name="search1"
              size={20}
            />
          )}
          onValueChanged={(val) => {
            const values = val.map((v: any) => ({
              LABEL: v.DESCRICAO,
              id: v.ID,
              c: 0,
              q: 0,
            }));
            methods.setValue('values', values);
          }}
          name="defects"
          control={methods.control}
          placeholderSearch="Pesquisar ..."
          placeholder="Escolha um produto"
        />
      </Select.Wrapper>
    </View>
  );
};

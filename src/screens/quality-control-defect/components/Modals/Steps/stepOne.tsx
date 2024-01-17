import { useCallback, useEffect, useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { View } from 'react-native';
import { useQuery } from 'react-query';

import { Select } from '@/components/Select';
import SelectTest from '@/components/Select/selectTest';
import { useOnRequired } from '@/hooks/useOnRequired';
import {
  getAllDefects,
  getAllProducts,
} from '@/screens/quality-control-defect/utils';
import { useFilterStore } from '@/store/filterStore';
import { missingFilters } from 'util/functions/missingFilters';
import { addLabelAndValue } from 'util/handle-options-props';

interface StepProps {
  methods: UseFormReturn;
  onRequired: (value?: unknown) => boolean;
}

export const StepOne = ({ methods, onRequired }: StepProps) => {
  const [selectedDefects, setSelectedDefects] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const handleSelectedItemsChange = useCallback(
    (newSelectedItems: any) => {
      setSelectedDefects(newSelectedItems);
      methods.setValue('defects', newSelectedItems);

      const values = methods.getValues('values');
      const result = newSelectedItems?.map(
        (v: { ID: number; DESCRICAO: string }) => ({
          c: values.find((val: { id: number }) => val?.id == v.ID)?.c || 0,
          id: v.ID,
          label: v.DESCRICAO,
          q: values.find((val: { id: number }) => val?.id == v.ID)?.q || 0,
        })
      );

      methods.setValue('values', result);
    },
    [methods]
  );
  const handleSelectedItemsChangeProduct = useCallback(
    (newSelectedItems: any) => {
      setSelectedProducts(newSelectedItems);
      methods.setValue('product', newSelectedItems);
    },
    [methods]
  );

  useEffect(() => {
    setSelectedDefects(methods.getValues('defects'));
  }, [methods.getValues('defects')]);

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
        <SelectTest
          isSearch={true}
          isMulti={false}
          test={methods.getValues('product') || []}
          value={selectedProducts}
          placeholder="Selecione ou pesquise um Produto"
          data={queryProducts.data || []}
          onChange={handleSelectedItemsChangeProduct}
          isLoading={queryProducts.isLoading}
        />
      </Select.Wrapper>
      <Select.Wrapper required label="Defeito">
        <SelectTest
          isSearch={true}
          isMulti={true}
          test={methods.getValues('defects') || []}
          value={selectedDefects}
          placeholder="Selecione ou pesquise um Defeito"
          data={queryDefects.data || []}
          onChange={handleSelectedItemsChange}
          isLoading={queryDefects.isLoading}
        />
      </Select.Wrapper>
    </View>
  );
};

{
  /* <Select.Select
          isLoading={queryProducts.isLoading}
          item={queryProducts.data || []}
          value={methods.getValues('product')}
          placeholder="Selecione ou pesquise um Produto"
          setValue={(props) => methods.setValue('product', props)}
          isSearch
        /> */
}
{
  /* <Select.Wrapper required label="Defeito">
        <Select.Select
          isLoading={queryDefects.isLoading}
          item={queryDefects.data || []}
          value={methods.getValues('defects')}
          placeholder="Selecione ou pesquise um Defeito"
          setValue={(props) => methods.setValue('defects', props)}
          onChange={(props) => {
            const values = methods.getValues('values');
            const result = props?.map(
              (v: { ID: number; DESCRICAO: string }) => ({
                c:
                  values.find((val: { id: number }) => val?.id == v.ID)?.c || 0,
                id: v.ID,
                label: v.DESCRICAO,
                q:
                  values.find((val: { id: number }) => val?.id == v.ID)?.q || 0,
              })
            );

            // const areEqual = result.every(
            //   (item: { id: any }, index: string | number) => {
            //     return item.id === values[index]?.id;
            //   }
            // );

            // if (areEqual) return methods.setValue('values', values);
            methods.setValue('values', result);
          }}
          isMulti
          isSearch
        />
      </Select.Wrapper> */
}

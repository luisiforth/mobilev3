import { useEffect, useRef } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { View, ActivityIndicator, FlatList } from 'react-native';
import { Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useMutation, useQuery } from 'react-query';

import Button from '@/components/Button';
import { Card } from '@/components/Card';
import { CardModules } from '@/components/CardModules';
import CardNotification from '@/components/CardNotification';
import { ControlledSelect } from '@/components/ControlledSelect';
import { Header } from '@/components/Header';
import Modal, { ComportModalProps } from '@/components/Modal';
import Search from '@/components/Search';
import { Select } from '@/components/Select';
import useAsync from '@/hooks/useAsync';
import { useCredentialStore, useFilterStore } from '@/store/filterStore';
import { Feather } from '@expo/vector-icons';
import { yupResolver } from '@hookform/resolvers/yup';
import { api } from 'util/axios/axios';
import { addLabelAndValue } from 'util/handle-options-props';

import { getLineAll, getUnitAll } from './api-urls';
import { schema } from './schema';
import { OptionLineProps, OptionUnitProps } from './types';
import { modules_data } from './utils/cards';

import * as S from './styles';

export default function HomeLayout() {
  const methods = useForm({
    resolver: yupResolver(schema),
  });
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = methods;

  const bottomSheetModalRefShow = useRef<ComportModalProps>(null);
  const { setFilter, filters } = useFilterStore();
  const { credential } = useCredentialStore();

  const insets = useSafeAreaInsets();
  const { getDefects } = useAsync();
  useEffect(() => {
    if (!filters || !filters.unit)
      return bottomSheetModalRefShow.current?.handlePresentModalPress();

    setValue('unit', filters.unit!);
    setValue('line', filters.line!);

    mutate(filters.unit!);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  const query_syncs = useQuery(['query_syncs', filters], async () => {
    if (!filters) {
      return bottomSheetModalRefShow.current?.handlePresentModalPress();
    }
    return getDefects(filters.unit as unknown as number);
  });

  const { data } = useQuery(
    ['query_unit', credential],
    async () => {
      // if (credential) return [];
      const response = await api.get<OptionUnitProps[]>(
        getUnitAll(credential?.userid as number)
      );
      return response.data;
    },
    {
      enabled: !!credential?.userid,
    }
  );

  const {
    mutate,
    data: response_line,
    isLoading,
  } = useMutation({
    mutationFn: async (unit: { value: number }) => {
      const response = await api.get<OptionLineProps[]>(
        getLineAll(credential?.userid as number, unit.value)
      );

      return response.data;
    },
    mutationKey: ['get_mutate_line'],
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setFilter({ line: data.line, unit: data.unit });
    return bottomSheetModalRefShow.current?.handleDismiss();
  };

  const optionLine = response_line
    ? addLabelAndValue(response_line, 'DESCLINHA', 'IDLINHA')
    : [];

  const optionUnit = data
    ? addLabelAndValue(data, 'DESCUNIDADE', 'IDUNIDADE')
    : [];

  return (
    <>
      {/* @ts-ignore */}
      <S.Root.WrapperIndex insets={insets}>
        <Header.Wrapper>
          <Header.YStack>
            <Header.Options
              type="filter"
              onPress={bottomSheetModalRefShow.current?.handlePresentModalPress}
            />

            {/* <Search placeholder="Buscar ..." /> */}
            <Header.Options type="menu" />
          </Header.YStack>
          <Header.YStack>
            <View>
              <Header.Text text="Olá," />
              <Header.Title title={credential?.username as string} />
            </View>
            <Header.Image src="https://as2.ftcdn.net/v2/jpg/05/75/67/99/1000_F_575679944_Z4IIATf3mJLCQhXhNFAorlpYPCUvnXuz.jpg" />
          </Header.YStack>
        </Header.Wrapper>

        <CardNotification data={'a'} />

        {!filters?.unit && !query_syncs.isLoading ? (
          <View
            style={{
              alignItems: 'center',
              gap: 20,
            }}
          >
            <ActivityIndicator />
            <Text>Selecione uma unidade e linha para continuar...</Text>
          </View>
        ) : (
          <Card.Wrapper>
            <Card.Header>
              <Card.Title title="Mais acessados" />
            </Card.Header>
            <Card.Container>
              <S.Root.WrapperFlatList>
                <FlatList
                  data={modules_data}
                  numColumns={2}
                  renderItem={RenderItem}
                />
              </S.Root.WrapperFlatList>
            </Card.Container>
          </Card.Wrapper>
        )}
      </S.Root.WrapperIndex>
      <Modal snapPoints={['40%', '60%']} ref={bottomSheetModalRefShow}>
        <S.Root.WrapperModal>
          <Select.Wrapper error={errors.unit?.message} label="Unidade *">
            <ControlledSelect
              item={optionUnit}
              name="unit"
              control={control}
              placeholder="Escolha uma unidade"
              onValueChanged={(value) => {
                mutate(value);
              }}
            />
          </Select.Wrapper>

          <Select.Wrapper error={errors.line?.message} label="Linha *">
            <ControlledSelect
              item={optionLine}
              name="line"
              control={control}
              placeholder="Escolha uma linha"
            />
          </Select.Wrapper>
          <Button
            text="Filtrar"
            isLoading={isLoading}
            onPress={handleSubmit(onSubmit)}
          />
        </S.Root.WrapperModal>
      </Modal>
      {/* <Modal isModalOpen={modalVisible} toggleModal={toggleModal} /> */}
    </>
  );
}

export function RenderItem({
  item,
}: {
  item: { icon: keyof typeof Feather.glyphMap; path: string; title: string };
}) {
  return (
    <CardModules.Wrapper href={item.path}>
      <CardModules.Icon icon={item.icon} />
      <CardModules.Title title={item.title} />
    </CardModules.Wrapper>
  );
}

import { memo } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Text, View } from 'react-native';
import {
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';
import { UnistylesRuntime } from 'react-native-unistyles';

import { TextInput } from '@/components/TextInput';

import { InputTwoStep } from '../../InputStepTwo';

interface StepProps {
  methods: UseFormReturn;
  onRequired: (value?: unknown) => boolean;
}

type TDefects = {
  label: string;
  ID: number;
};

export const StepTwo = ({ methods, onRequired }: StepProps) => {
  return (
    <View style={{ height: UnistylesRuntime.screen.height * 0.65 }}>
      {/* <FlashList
        estimatedItemSize={100}
        data={methods.getValues('values')}
        renderItem={({ item, index, target, extraData }) => {
          console.log({ index, target, extraData });
          return (
            <TouchableWithoutFeedback>
              <InputTwoStep
                onRequired={onRequired}
                methods={methods}
                index={index}
              />
            </TouchableWithoutFeedback>
            );
          }}
        /> */}
      <ScrollView
        keyboardShouldPersistTaps={'always'}
        style={{ height: UnistylesRuntime.screen.height * 0.65, zIndex: 100 }}
      >
        {methods.getValues('values')?.map((v: TDefects, index: number) => (
          <TouchableWithoutFeedback style={{ flex: 1 }} key={index}>
            <Text style={{ fontSize: 24, fontWeight: '600' }}>
              {v.label} <Text style={{ color: 'red' }}> *</Text>{' '}
            </Text>
            <InputTwoStep
              onRequired={onRequired}
              methods={methods}
              index={index}
            />
          </TouchableWithoutFeedback>
        ))}
      </ScrollView>
    </View>
  );
};

export default memo(StepTwo);

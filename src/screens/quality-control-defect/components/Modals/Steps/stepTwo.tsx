import { memo } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { View } from 'react-native';
import {
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';
import { UnistylesRuntime } from 'react-native-unistyles';

import SelectTest from '@/components/Select/selectTest';
import { TextInput } from '@/components/TextInput';
import { FlashList } from '@shopify/flash-list';

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
  console.log();
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
          <TouchableWithoutFeedback style={{ flexWrap: 'wrap' }} key={index}>
            <TextInput.Wrapper required label={v.label} />
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

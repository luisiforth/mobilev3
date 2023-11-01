import { useCallback, useEffect, useState } from 'react';
import { FieldErrors, UseFormReturn } from 'react-hook-form';
import { Pressable } from 'react-native';

import { ControlledDateTime } from '@/components/ControlledDateTime';
import { ControlledInput } from '@/components/ControlledInput';
import { ControlledInputModal } from '@/components/ControlledInputModal';
import { TextInput } from '@/components/TextInput';
// import { useOnRequired } from '@/hooks/useOnRequired';
import { addMinutes, format, parseISO } from 'date-fns';

import { schema } from '../schema';

import * as S from './styles';

interface StepProps {
  methods: UseFormReturn;
  errors: FieldErrors<typeof schema.fields>;
  onRequired: (value?: unknown) => boolean;
}

export const StepTwo = ({ methods }: StepProps) => {
  const [differenceInMinutes, setDifferenceInMinutes] = useState<Date>();
  const [finalHour, setFinalHour] = useState<Date>(new Date());
  const [visibility, setVisibility] = useState({
    dateInitial: false,
    dateEnd: false,
    timeInitial: false,
    timeFinal: false,
  });

  const formatHourToPtBR = (date: Date) => {
    return (
      date.toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit',
      }) || date
    );
  };

  const formatDateToPtBR = (date: Date) => {
    return format(date, 'dd/MM/yyyy');
  };

  const validHourValue = (value: Date) => {
    return value ? formatHourToPtBR(value) : formatHourToPtBR(new Date());
  };

  const validDateValue = (value: Date) => {
    return value ? formatDateToPtBR(value) : formatDateToPtBR(new Date());
  };

  const handleHoursDiff = () => {
    setDifferenceInMinutes(undefined);
    const initialHour = methods.getValues('initialHour') || new Date();
    const finalHour = methods.getValues('finalHour') || new Date();
    if (!isNaN(initialHour) && !isNaN(finalHour)) {
      const diffMilliseconds = finalHour - initialHour;
      const diffMinutes = Math.floor(diffMilliseconds / (1000 * 60));
      methods.setValue('timeInMinutes', diffMinutes.toString());
    } else {
      methods.setValue('timeInMinutes', '0');
    }
  };

  useEffect(() => {
    methods.setValue('finalHour', differenceInMinutes);
    setFinalHour(methods.getValues('finalHour'));
  }, [differenceInMinutes]);

  const updateTimeInputs = (difference: number) => {
    if (!isNaN(difference)) {
      const dateInit = format(
        methods.getValues('initialHour') || new Date(),
        'yyyy-MM-dd'
      );
      const timeInitial =
        methods.getValues('initialHour') || formatHourToPtBR(new Date());
      const newEndTime = addMinutes(
        parseISO(`${dateInit}T${timeInitial}`),
        difference
      );

      if (newEndTime) {
        setDifferenceInMinutes(newEndTime);
      }
    }
  };

  const toggleAndHandle = (
    key: keyof typeof visibility,
    handleFunction?: () => void
  ) => {
    toggleVisibility(key);
    if (handleFunction) {
      handleFunction();
    }
  };

  const toggleVisibility = (key: keyof typeof visibility) => {
    setVisibility((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <S.Root.WrapperSteps>
      <S.Root.Container>
        <Pressable onPress={() => toggleVisibility('dateInitial')}>
          <TextInput.Wrapper label="Data inicial">
            <TextInput.Content
              value={validDateValue(methods.getValues('initialDate'))}
              editable={false}
            />
          </TextInput.Wrapper>
        </Pressable>
        <Pressable onPress={() => toggleVisibility('timeInitial')}>
          <TextInput.Wrapper label="Hora inicial">
            <TextInput.Content
              value={validHourValue(methods.getValues('initialHour')) as string}
              editable={false}
            />
          </TextInput.Wrapper>
        </Pressable>
      </S.Root.Container>
      <S.Root.Container>
        <Pressable onPress={() => toggleVisibility('dateEnd')}>
          <TextInput.Wrapper label="Data final">
            <TextInput.Content
              value={validDateValue(methods.getValues('finalDate'))}
              editable={false}
            />
          </TextInput.Wrapper>
        </Pressable>
        <Pressable onPress={() => toggleVisibility('timeFinal')}>
          <TextInput.Wrapper label="Hora final">
            <TextInput.Content
              value={validHourValue(finalHour) as string}
              editable={false}
            />
          </TextInput.Wrapper>
        </Pressable>
      </S.Root.Container>
      <TextInput.Wrapper label="Tempo em minutos">
        <ControlledInput
          inputMode="numeric"
          control={methods.control}
          defaultValue={'0'}
          onValueChanged={updateTimeInputs}
          name="timeInMinutes"
        />
      </TextInput.Wrapper>
      <TextInput.Wrapper label="Observação">
        <ControlledInputModal
          control={methods.control}
          name="observation"
          multiline
        />
      </TextInput.Wrapper>
      {visibility.dateEnd && (
        <ControlledDateTime
          control={methods.control}
          maximumDate={methods.getValues('initialDate') || new Date()}
          name="finalDate"
          onChangeDate={() => toggleVisibility('dateEnd')}
          mode="date"
        />
      )}
      {visibility.timeInitial && (
        <ControlledDateTime
          control={methods.control}
          name="initialHour"
          onChangeDate={() => toggleAndHandle('timeInitial')}
          mode="time"
        />
      )}
      {visibility.timeFinal && (
        <ControlledDateTime
          control={methods.control}
          name="finalHour"
          onChangeDate={() =>
            toggleAndHandle('timeFinal', () =>
              setFinalHour(methods.getValues('finalHour'), handleHoursDiff())
            )
          }
          mode="time"
        />
      )}
    </S.Root.WrapperSteps>
  );
};

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
  // new Date()

  const [finalHour, setFinalHour] = useState<Date>(new Date());
  const [visibleDateInitial, setVisibleDateInitial] = useState(false);
  const [visibleDateEnd, setVisibleDateEnd] = useState(false);
  const [visibleTimeInitial, setVisibleTimeInitial] = useState(false);
  const [visibleTimeFinal, setVisibleTimeFinal] = useState(false);

  const onChangeDateInitial = () => {
    return showDateInitial();
  };

  const onChangeDateEnd = () => {
    return showDateEnd();
  };

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
    const initialHour = methods.getValues('initialHour') || new Date(); // Converter o valor para um objeto Date
    const finalHour = methods.getValues('finalHour') || new Date(); // Converter o valor para um objeto Date
    if (!isNaN(initialHour) && !isNaN(finalHour)) {
      const diffMilliseconds = finalHour - initialHour; // Diferença em milissegundos
      const diffMinutes = Math.floor(diffMilliseconds / (1000 * 60)); // Diferença em minutos
      return methods.setValue('timeInMinutes', diffMinutes.toString());
    } else {
      return methods.setValue('timeInMinutes', '0');
    }
  };

  useEffect(() => {
    methods.setValue('finalHour', differenceInMinutes);
    setFinalHour(methods.getValues('finalHour'));
  }, [differenceInMinutes]);

  const updateTimeInputs = (difference: number) => {
    if (isNaN(difference)) return;

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
  };

  const onChangeTimeInitial = () => {
    handleHoursDiff();
    return showTimeInitial();
  };

  const onChangeTimeEnd = () => {
    setFinalHour(methods.getValues('finalHour'));
    handleHoursDiff();
    return showTimeFinal();
  };

  const showDateInitial = useCallback(() => {
    setVisibleDateInitial(!visibleDateInitial);
  }, [visibleDateInitial]);

  const showDateEnd = useCallback(() => {
    setVisibleDateEnd(!visibleDateEnd);
  }, [visibleDateEnd]);

  const showTimeInitial = useCallback(() => {
    setVisibleTimeInitial(!visibleTimeInitial);
  }, [visibleTimeInitial]);

  const showTimeFinal = useCallback(() => {
    setVisibleTimeFinal(!visibleTimeFinal);
  }, [visibleTimeFinal]);

  return (
    <S.Root.WrapperSteps>
      <S.Root.Container>
        <Pressable onPress={showDateInitial}>
          <TextInput.Wrapper label="Data inicial">
            <TextInput.Content
              value={validDateValue(methods.getValues('initialDate'))}
              editable={false}
            />
          </TextInput.Wrapper>
        </Pressable>
        <Pressable onPress={showTimeInitial}>
          <TextInput.Wrapper label="Hora inicial">
            <TextInput.Content
              value={validHourValue(methods.getValues('initialHour')) as string}
              editable={false}
            />
          </TextInput.Wrapper>
        </Pressable>
      </S.Root.Container>
      <S.Root.Container>
        <Pressable onPress={showDateEnd}>
          <TextInput.Wrapper label="Data final">
            <TextInput.Content
              value={validDateValue(methods.getValues('finalDate'))}
              editable={false}
            />
          </TextInput.Wrapper>
        </Pressable>
        <Pressable onPress={showTimeFinal}>
          <TextInput.Wrapper label="Hora final">
            <TextInput.Content
              value={validHourValue(finalHour) as string}
              editable={false}
            />
          </TextInput.Wrapper>
        </Pressable>
      </S.Root.Container>
      <TextInput.Wrapper label="Tempo em minutos">
        {/* <TextInput.Content value={timeInMinutes} editable={false} /> */}
        <ControlledInput
          inputMode="numeric"
          control={methods.control}
          defaultValue={'0'}
          // value={timeInMinutes}
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
      {visibleDateInitial && (
        <ControlledDateTime
          control={methods.control}
          name="initialDate"
          onChangeDate={onChangeDateInitial}
          maximumDate={new Date()}
          mode="date"
          // value={date}
        />
      )}
      {visibleDateEnd && (
        <ControlledDateTime
          control={methods.control}
          maximumDate={methods.getValues('initialDate') || new Date()}
          name="finalDate"
          onChangeDate={onChangeDateEnd}
          // maximumDate={new Date()}
          mode="date"
          // value={date}
        />
      )}
      {visibleTimeInitial && (
        <ControlledDateTime
          control={methods.control}
          name="initialHour"
          onChangeDate={onChangeTimeInitial}
          // maximumDate={new Date()}
          mode="time"
          // value={date}
        />
      )}
      {visibleTimeFinal && (
        <ControlledDateTime
          control={methods.control}
          name="finalHour"
          onChangeDate={onChangeTimeEnd}
          // maximumDate={new Date()}
          mode="time"
          // value={date}
        />
      )}
    </S.Root.WrapperSteps>
  );
};

import { useCallback, useState } from 'react';
import { Pressable } from 'react-native';
import { ControlledDateTime } from '@/components/ControlledDateTime';
import { ControlledInput } from '@/components/ControlledInput';
import { TextInput } from '@/components/TextInput';
import { format } from 'date-fns';
import * as S from './styles';
import { StepProps } from './stepTwo';


export const StepTwo = ({ methods }: StepProps) => {
  const [timeInMinutes, setTimeInMinutes] = useState('0');
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
    return date.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
    });
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
    const initialHour = methods.getValues('initialHour') || new Date(); // Converter o valor para um objeto Date
    const finalHour = methods.getValues('finalHour') || new Date(); // Converter o valor para um objeto Date

    if (!isNaN(initialHour) && !isNaN(finalHour)) {
      const diffMilliseconds = finalHour - initialHour; // Diferença em milissegundos
      const diffMinutes = Math.floor(diffMilliseconds / (1000 * 60)); // Diferença em minutos
      setTimeInMinutes(diffMinutes.toString());
      return methods.setValue('timeInMinutes', diffMinutes.toString());
    } else {
      console.log('Horas inválidas.'); // Trate o caso de horas inválidas conforme necessário
      return methods.setValue('timeInMinutes', '0');
    }
  };

  const onChangeTimeInitial = () => {
    handleHoursDiff();
    return showTimeInitial();
  };

  const onChangeTimeEnd = () => {
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
          <TextInput.Wrapper label="Data Inícial">
            <TextInput.Content
              value={validDateValue(methods.getValues('initialDate'))}
              editable={false} />
          </TextInput.Wrapper>
        </Pressable>
        <Pressable onPress={showTimeInitial}>
          <TextInput.Wrapper label="Hora Inícial">
            <TextInput.Content
              value={validHourValue(methods.getValues('initialHour'))}
              editable={false} />
          </TextInput.Wrapper>
        </Pressable>
      </S.Root.Container>
      <S.Root.Container>
        <Pressable onPress={showDateEnd}>
          <TextInput.Wrapper label="Data Final">
            <TextInput.Content
              value={validDateValue(methods.getValues('finalDate'))}
              editable={false} />
          </TextInput.Wrapper>
        </Pressable>
        <Pressable onPress={showTimeFinal}>
          <TextInput.Wrapper label="Hora Final">
            <TextInput.Content
              value={validHourValue(methods.getValues('finalHour'))}
              editable={false} />
          </TextInput.Wrapper>
        </Pressable>
      </S.Root.Container>
      <TextInput.Wrapper label="Tempo em minutos">
        <TextInput.Content value={timeInMinutes} editable={false} />
        {/* <ControlledInput control={methods.control} name="timeInMinutes" /> */}
      </TextInput.Wrapper>
      <TextInput.Wrapper label="Observação">
        <ControlledInput
          control={methods.control}
          name="observation"
          multiline />
      </TextInput.Wrapper>
      {visibleDateInitial && (
        <ControlledDateTime
          control={methods.control}
          name="initialDate"
          onChangeDate={onChangeDateInitial}
          // maximumDate={new Date()}
          mode="date" />
      )}
      {visibleDateEnd && (
        <ControlledDateTime
          control={methods.control}
          name="finalDate"
          onChangeDate={onChangeDateEnd}
          // maximumDate={new Date()}
          mode="date" />
      )}
      {visibleTimeInitial && (
        <ControlledDateTime
          control={methods.control}
          name="initialHour"
          onChangeDate={onChangeTimeInitial}
          // maximumDate={new Date()}
          mode="time" />
      )}
      {visibleTimeFinal && (
        <ControlledDateTime
          control={methods.control}
          name="finalHour"
          onChangeDate={onChangeTimeEnd}
          // maximumDate={new Date()}
          mode="time" />
      )}
    </S.Root.WrapperSteps>
  );
};

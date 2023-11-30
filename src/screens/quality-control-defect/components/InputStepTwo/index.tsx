import { useCallback } from 'react';
import { Alert, TouchableOpacity, View, Text } from 'react-native';

import { ControlledInput } from '@/components/ControlledInput';
import { TextInput } from '@/components/TextInput';
import { useOnRequired } from '@/hooks/useOnRequired';
import AntDesign from '@expo/vector-icons/AntDesign';

import { styles } from '../Modals/styles';

type TInput = {
  methods: any;
  onRequired: any;
  index: number;
};

export const InputTwoStep = ({ methods, onRequired, index }: TInput) => {
  const handleInputChangeC = useCallback((value: number, sum: number) => {
    const number = Number(value) + sum;
    if (number < 0)
      return Alert.alert('Alerta', 'O valor não pode ser menor que 0.');
    methods.setValue(`values[${index}].c`, number.toString());
  }, []);

  const handleInputChangeQ = useCallback((value: number, sum: number) => {
    const number = Number(value) + sum;
    if (number < 0)
      return Alert.alert('Alerta', 'O valor não pode ser menor que 0.');
    methods.setValue(`values[${index}].q`, number.toString());
  }, []);

  useOnRequired([`values[${index}]`], {
    isAllZero: true,
    methods,
    onRequired,
  });

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderBottomWidth: 1,
        padding: 10,
        borderColor: 'black',
        marginBottom: 10,
      }}
    >
      <TextInput.Wrapper label="C">
        <View style={{ flexDirection: 'row', gap: 10 }}>
          <TouchableOpacity
            style={styles.minus}
            activeOpacity={0.8}
            onPress={() =>
              handleInputChangeC(methods.getValues(`values[${index}].c`), -1)
            }
          >
            <AntDesign name="minus" color={'white'} size={20} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.minus}
            activeOpacity={0.8}
            onPress={() =>
              handleInputChangeC(methods.getValues(`values[${index}].c`), -10)
            }
          >
            <Text style={{ color: 'white', fontSize: 18 }}>-10</Text>
          </TouchableOpacity>

          <ControlledInput
            control={methods.control}
            name={`values[${index}].c`}
            defaultValue="0"
            keyboardType="numeric"
            style={{ width: 80, textAlign: 'center' }}
          />
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.plus}
            onPress={() =>
              handleInputChangeC(methods.getValues(`values[${index}].c`), 10)
            }
          >
            <Text style={{ color: 'white', fontSize: 18 }}>10</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.plus}
            onPress={() =>
              handleInputChangeC(methods.getValues(`values[${index}].c`), 1)
            }
          >
            <AntDesign name="plus" color={'white'} size={20} />
          </TouchableOpacity>
        </View>
      </TextInput.Wrapper>
      <TextInput.Wrapper label="Quebra">
        <View style={{ flexDirection: 'row', gap: 10 }}>
          <TouchableOpacity
            style={styles.minus}
            activeOpacity={0.8}
            onPress={() =>
              handleInputChangeQ(methods.getValues(`values[${index}].q`), -1)
            }
          >
            <AntDesign name="minus" color={'white'} size={20} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.minus}
            activeOpacity={0.8}
            onPress={() =>
              handleInputChangeQ(methods.getValues(`values[${index}].q`), -10)
            }
          >
            <Text style={{ color: 'white', fontSize: 18 }}>-10</Text>
          </TouchableOpacity>

          <ControlledInput
            control={methods.control}
            name={`values[${index}].q`}
            keyboardType="numeric"
            defaultValue="0"
            style={{ width: 80, textAlign: 'center' }}
          />
          <TouchableOpacity
            style={styles.plus}
            activeOpacity={0.8}
            onPress={() =>
              handleInputChangeQ(methods.getValues(`values[${index}].q`), 10)
            }
          >
            <Text style={{ color: 'white', fontSize: 18 }}>10</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.plus}
            activeOpacity={0.8}
            onPress={() =>
              handleInputChangeQ(methods.getValues(`values[${index}].q`), 1)
            }
          >
            <AntDesign name="plus" color={'white'} size={20} />
          </TouchableOpacity>
        </View>
      </TextInput.Wrapper>
    </View>
  );
};

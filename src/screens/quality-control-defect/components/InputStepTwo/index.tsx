import { useCallback, memo } from 'react';
import { Alert, View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { ControlledInput } from '@/components/ControlledInput';
import { TextInput } from '@/components/TextInput';
import { useOnRequired } from '@/hooks/useOnRequired';
import AntDesign from '@expo/vector-icons/AntDesign';

type TInput = {
  methods: any;
  onRequired: any;
  index: number;
};

export const InputTwoStep = ({ methods, onRequired, index }: TInput) => {
  const { styles } = useStyles(stylesheet);
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
    methods,
    onRequired,
    myRule() {
      const values = methods.getValues(`values`);

      return values.some(
        (obj: { c: number; q: number }) => obj.c > 0 || obj.q > 0
      );
    },
  });

  return (
    <View
      key={index}
      style={{
        borderBottomWidth: 1,
        borderColor: 'black',
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        marginBottom: 10,
        padding: 10,
      }}
    >
      <View style={styles.wrapper}>
        <Text style={styles.subtitle}>C</Text>
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
              handleInputChangeC(methods.getValues(`values[${index}].c`), -5)
            }
          >
            <Text style={styles.textButton}>-5</Text>
          </TouchableOpacity>

          <ControlledInput
            control={methods.control}
            name={`values[${index}].c`}
            defaultValue="0"
            keyboardType="numeric"
            style={styles.input}
          />
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.plus}
            onPress={() =>
              handleInputChangeC(methods.getValues(`values[${index}].c`), 5)
            }
          >
            <Text style={styles.textButton}>5</Text>
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
      </View>
      <View style={styles.wrapper}>
        <Text style={styles.subtitle}>Quebra</Text>
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
              handleInputChangeQ(methods.getValues(`values[${index}].q`), -5)
            }
          >
            <Text style={{ color: 'white', fontSize: 25, fontWeight: '400' }}>
              -5
            </Text>
          </TouchableOpacity>

          <ControlledInput
            control={methods.control}
            name={`values[${index}].q`}
            keyboardType="numeric"
            defaultValue="0"
            style={styles.input}
          />
          <TouchableOpacity
            style={styles.plus}
            activeOpacity={0.8}
            onPress={() =>
              handleInputChangeQ(methods.getValues(`values[${index}].q`), 5)
            }
          >
            <Text style={styles.textButton}>5</Text>
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
      </View>
    </View>
  );
};

const stylesheet = createStyleSheet((theme) => ({
  textButton: {
    color: 'white',
    fontSize: 25,
    fontWeight: '400',
  },
  input: {
    width: 60,
    fontSize: 24,
    fontWeight: '400',
    textAlign: 'center',
  },
  wrapper: {
    position: 'relative',
  },
  subtitle: {
    color: 'black',
    fontWeight: '400',
    fontSize: 24,
    paddingBottom: 6,
  },
  icon: {
    marginRight: 15,
  },
  minus: {
    alignItems: 'center',
    backgroundColor: 'red',
    borderRadius: 6,
    height: 60,
    justifyContent: 'center',
    width: 60,
  },
  plus: {
    alignItems: 'center',
    backgroundColor: 'green',
    borderRadius: 6,
    height: 60,
    justifyContent: 'center',
    width: 60,
  },
}));

export default memo(InputTwoStep);

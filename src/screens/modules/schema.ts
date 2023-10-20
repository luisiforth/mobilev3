import * as yup from 'yup';

export const schema = yup.object().shape({
  line: yup.object().shape({
    label: yup.string().required('O campo é obrigatório'),
    value: yup.number().required('O campo é obrigatório'),
  }),
  unit: yup.object().shape({
    label: yup.string().required('O campo é obrigatório'),
    value: yup.number().required('O campo é obrigatório'),
  }),
});

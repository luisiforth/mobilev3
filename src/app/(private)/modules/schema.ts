import * as yup from 'yup';

export const schema = yup.object().shape({
  line: yup.number().required('Linha é um campo obrigatório'),
  unit: yup.number().required('Unidade é um campo obrigatório'),
});

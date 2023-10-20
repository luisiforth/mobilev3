import * as yup from 'yup';

export const schema = yup.object().shape({
  password: yup.string().required('Senha é um campo obrigatório'),
  user: yup.string().required('Usuário é um campo obrigatório'),
});

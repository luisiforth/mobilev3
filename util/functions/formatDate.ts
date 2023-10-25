import { format } from 'date-fns';

export const formatDate = (date: string) => {
  if (!date) return;
  const newDate = new Date(date);
  const result = format(newDate, 'dd/MM/yyyy');
  return result;
};

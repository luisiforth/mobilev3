import { addLabelAndValue } from 'util/handle-options-props';

export function resLine(response_line: unknown[]) {
  return response_line
    ? addLabelAndValue(response_line, 'DESCLINHA', 'IDLINHA')
    : [];
}

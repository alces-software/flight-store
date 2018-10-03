import { NAME } from './constants';

import { buildModalSelectors } from '../../utils/modals';

export const modal = buildModalSelectors(NAME);

export function submitSucceeded(state) {
  return !!state[NAME].state.submitSucceeded;
}

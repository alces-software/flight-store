import { NAME } from './constants';

import { buildModalSelectors } from '../../utils/selectors';

export const formModal = buildModalSelectors(NAME);

export function submitSucceeded(state) {
  return !!state[NAME].state.submitSucceeded;
}

import { NAME } from './constants';

import utils from '../utils';

export const modal = utils.modal.buildModalSelectors(NAME);

export function submitSucceeded(state) {
  return !!state[NAME].state.submitSucceeded;
}

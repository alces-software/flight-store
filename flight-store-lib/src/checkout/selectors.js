import { NAME } from './constants';

import utils from '../utils';

export const modal = utils.modals.buildModalSelectors(NAME);

export function submitSucceeded(state) {
  return !!state[NAME].state.submitSucceeded;
}

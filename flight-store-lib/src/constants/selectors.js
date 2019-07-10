import { NAME } from './constants';

export function get(state, { name }) {
  return (state[NAME] || {} )[name];
}

import { SET } from './actionTypes';

export function set(name, value) {
  return {
    type: SET,
    payload: {
      name,
      value,
    },
  };
}

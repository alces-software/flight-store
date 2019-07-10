import { combineReducers } from 'redux';

import { SET } from './actionTypes';

const initialState = {};

export default function reducer(state={}, { type, payload }) {
  if (type === SET) {
    return {
      ...state,
      [payload.name]: payload.value,
    };
  } else {
    return state;
  }
}

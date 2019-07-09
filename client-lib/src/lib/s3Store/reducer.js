import { combineReducers } from 'redux';
import { loadingStates } from 'flight-reactware';

import * as actionTypes from './actionTypes';

//
// Return a new reducer which calls each provided reducer in turn.
//
export function reduceReducers(...reducers) {
  return (state, action) => (
    reducers.reduceRight(
      (newState, nextReducer) => nextReducer(newState, action),
      state,
    )
  );
}

function filenameReducer(state=null, { payload, type }) {
  if (type !== actionTypes.LOADING) { return state; }
  return payload.filename;
}

function urlReducer(state=null, { payload, type }) {
  if (type !== actionTypes.LOADING) { return state; }
  return payload.url === undefined ? null : payload.url;
}

function contentReducer(state=null, { payload, type }) {
  switch (type) {

    case actionTypes.LOADED:
      return payload;

    case actionTypes.FAILED:
      return null;

    default:
      return state;
  }
}

const metaReducers = combineReducers({
  [loadingStates.constants.NAME]: loadingStates.reducer({
    pending: actionTypes.LOADING,
    resolved: actionTypes.LOADED,
    rejected: actionTypes.FAILED,
  }),
  url: urlReducer,
  filename: filenameReducer,
});

const storeReducer = combineReducers({
  content: contentReducer,
  meta: metaReducers,
});

export default function reducer(state={}, action) {
  if (Object.values(actionTypes).includes(action.type)) {
    const storeName = action.meta.storeName;
    return {
      ...state,
      [storeName]: storeReducer(state[storeName], action),
    };
  } else {
    return state;
  }
}

import { createSelector } from 'reselect';
import { loadingStates } from 'flight-reactware';

import { NAME } from './constants';

function namedStore(state, { storeName }) {
  const stores = state[NAME] || {};
  return stores[storeName];
}

function getStoreMetaProp(state, props, propName) {
  const store = namedStore(state, props);
  if (store == null) { return store; }
  return store.meta[propName];
}

export function filename(state, props) {
  return getStoreMetaProp(state, props, 'filename');
}

export function content(state, props) {
  const store = namedStore(state, props);
  if (store == null) { return store; }
  return store.content;
}

export const retrieval = createSelector(
  namedStore,
  (state, params) => params.filename,

  loadingStates.selectors.retrieval,
);

import { NAME } from './constants';

function namedStore(state, storeName) {
  const stores = state[NAME] || {};
  return stores[storeName];
}

function getStoreMetaProp(state, storeName, prop) {
  const store = namedStore(state, storeName);
  if (store == null) { return store; }
  return store.meta[prop];
}

export function filename(state, props) {
  return getStoreMetaProp(state, props.storeName, 'filename');
}

export function content(state, props) {
  const store = namedStore(state, props.storeName);
  if (store == null) { return store; }
  return store.content;
}

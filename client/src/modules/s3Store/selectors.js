import { NAME } from './constants';

function namedStore(state, storeName) {
  const stores = state[NAME] || {};
  return stores[storeName];
}

function getStoreDataProp(state, storeName, prop) {
  const store = namedStore(state, storeName);
  if (store == null) { return store; }
  return store.data[prop];
}

export function filename(state, props) {
  return getStoreDataProp(state, props.storeName, 'filename');
}

export function content(state, props) {
  return getStoreDataProp(state, props.storeName, 'content');
}

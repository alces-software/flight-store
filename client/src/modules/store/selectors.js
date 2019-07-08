import { createSelector } from 'reselect';

import { buildModalSelectors } from '../../utils/modals';
import s3Store from '../s3Store';

import { NAME, S3_STORE_NAME } from './constants';

export const detailModal = buildModalSelectors(NAME, 'detail');

function withStoreName(props) {
  return { ...props, storeName: S3_STORE_NAME };
}

function productType(state, props) {
  return props.match && props.match.params.productType;
}

function s3StoreContents(state, props) {
  return s3Store.selectors.content(state, withStoreName(props));
}

export function filename(state, props) {
  return s3Store.selectors.filename(state, withStoreName(props));
}

export const productTypeDefs = createSelector(
  s3StoreContents,

  (contents) => contents == null ? contents : contents.productTypeDefinitions,
);

export const productTypeDef = createSelector(
  s3StoreContents,
  productType,

  (contents, type) => {
    if (contents == null || type == null) { return null; }
    return contents.productTypeDefinitions.find(t => t.type === type);
  }
);

export const products = createSelector(
  s3StoreContents,
  productType,

  (contents, type) => {
    if (contents == null || type == null) { return null; }
    return contents[type];
  },
);

export function retrieval(state, props) {
  return s3Store.selectors.retrieval(state, {
    ...withStoreName(props),
    filename: filename(state, props),
  });
}

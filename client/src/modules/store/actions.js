import { buildModalActions } from '../../utils/modals';
import s3Store from '../s3Store';

import * as actionTypes from './actionTypes';
import * as selectors from './selectors';
import {
  DEFAULT_PRODUCTS_FILE,
  DEFAULT_PRODUCTS_URL,
  PRODUCTS_URL_PREFIX,
} from './constants';

export const detailModal = buildModalActions(
  selectors.detailModal,
  actionTypes.DETAIL_MODAL_SHOWN,
  actionTypes.DETAIL_MODAL_HIDDEN
);

let devProducts;
if (process.env.NODE_ENV === 'development') {
  devProducts = require('./data/products.example.json');
}

const defaults = {
  defaultFilename: DEFAULT_PRODUCTS_FILE,
  defaultUrl: DEFAULT_PRODUCTS_URL,
  prefix: PRODUCTS_URL_PREFIX,
};

export function loadProducts(fileOverride) {
  return s3Store.actions.loadFile('products', fileOverride, defaults, devProducts);
}

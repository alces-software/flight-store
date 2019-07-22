import constants from '../constants';
import s3Store from '../s3Store';
import utils from '../utils';

import * as actionTypes from './actionTypes';
import * as selectors from './selectors';
import { S3_STORE_NAME, } from './constants';

export const detailModal = utils.modals.buildModalActions(
  selectors.detailModal,
  actionTypes.DETAIL_MODAL_SHOWN,
  actionTypes.DETAIL_MODAL_HIDDEN
);

let devProducts;
if (process.env.NODE_ENV === 'development') {
  devProducts = {};
}

function buildDefaults(getState) {
  const defaultFilename = constants.selectors.get(
    getState(),
    { name: 'DEFAULT_PRODUCTS_FILE' }
  );
  const prefix = constants.selectors.get(
    getState(),
    { name: 'PRODUCTS_URL_PREFIX' }
  );
  const defaultUrl = `${prefix}${defaultFilename}`;

  return {
    defaultFilename,
    defaultUrl,
    prefix,
  };
}

export function loadProducts(filenameOverride) {
  return (dispatch, getState) => {
    const defaults = buildDefaults(getState);
    const { filename } = s3Store.actions.buildConfig(
      filenameOverride,
      defaults,
      getState,
      S3_STORE_NAME,
    );
    const { initiated, rejected } = selectors.retrieval(
      getState(),
      { filename }
    );
    if (!initiated || rejected) {
      return dispatch(s3Store.actions.loadFile(
        S3_STORE_NAME,
        filenameOverride,
        defaults,
        devProducts
      ));
    }
  };
}

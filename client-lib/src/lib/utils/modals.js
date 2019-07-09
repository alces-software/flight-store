import { createSelector } from 'reselect';
import { modals } from 'flight-reactware';

import s3Store from '../s3Store';

export function buildModalSelectors(...namespace) {
  const dataSelector = modals.createModalDataSelector(...namespace, 'modal');

  const selectedProductId = createSelector(
    dataSelector,
    (data) => data.payload == null ? undefined : data.payload.productId,
  );

  const selectedProductType = createSelector(
    dataSelector,
    (data) => data.payload == null ? undefined : data.payload.productType,
  );

  return {
    modalData: dataSelector,

    isModalOpen: modals.createModalSelector(...namespace, 'modal'),

    product: createSelector(
      selectedProductId,
      selectedProductType,
      (state, params) => s3Store.selectors.content(
        state,
        { ...params, storeName: 'products' }
      ),

      (id, type, productsByType) => (
        (id == null || type == null) ? undefined : productsByType[type][id]
      ),
    ),

    productId: selectedProductId,
    productType: selectedProductType,
  };
}

export function buildModalActions(selector, showType, hideType) {
  return {
    show: (productId, productType) => ({
      type: showType,
      payload: {
        productId,
        productType,
      },
    }),

    hide: () => (dispatch, getState) => {
      const existingModalData = selector.modalData(getState());

      return dispatch({
        type: hideType,
        ...existingModalData,
      });
    },
  };
}

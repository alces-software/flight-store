import { createSelector } from 'reselect';
import { modals } from 'flight-reactware';

import clusterPacks from '../modules/store/data/packs';
import creditPacks from '../modules/store/data/credits';

const productsByType = {
  clusterPack: clusterPacks,
  creditPack: creditPacks,
};

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
      (id, type) => (id == null || type == null) ? undefined : productsByType[type][id]
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

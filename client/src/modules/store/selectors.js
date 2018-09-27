import { createSelector } from 'reselect';
import { modals } from 'flight-reactware';

import clusterPacks from './data/packs';
import { NAME } from './constants';

const products = {
  clusterPack: clusterPacks,
};

function buildModalSelectors(namespace) {
  const dataSelector = modals.createModalDataSelector(NAME, namespace, 'modal');

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

    isModalOpen: modals.createModalSelector(NAME, namespace, 'modal'),

    product: createSelector(
      selectedProductId,
      selectedProductType,
      (id, type) => (id == null || type == null) ? undefined : products[type][id]
    ),

    productId: selectedProductId,
    productType: selectedProductType,
  };
}

export const detailModal = buildModalSelectors('detail');
export const formModal = buildModalSelectors('form');

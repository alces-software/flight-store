import { createSelector } from 'reselect';
import { modals } from 'flight-reactware';

import clusterPacks from './data/packs';
import creditPacks from './data/credits';
import productTypeDefs from './data/productTypeDefinitions';
import { NAME } from './constants';

const productsByType = {
  clusterPack: clusterPacks,
  creditPack: creditPacks,
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
      (id, type) => (id == null || type == null) ? undefined : productsByType[type][id]
    ),

    productId: selectedProductId,
    productType: selectedProductType,
  };
}

export const detailModal = buildModalSelectors('detail');
export const formModal = buildModalSelectors('form');

function productType(state, params) {
  return params.match && params.match.params.productType;
}

export function productTypeDef(state, params) {
  const type = productType(state, params);
  if (type == null) { return null; }
  return productTypeDefs.find(t => t.type === type);
}

export function products(state, params) {
  const type = productType(state, params);
  if (type == null) { return null; }
  return productsByType[type];
}

export function submitSucceeded(state) {
  return !!state[NAME].form.state.submitSucceeded;
}

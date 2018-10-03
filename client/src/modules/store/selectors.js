import { buildModalSelectors } from '../../utils/modals';

import clusterPacks from './data/packs';
import creditPacks from './data/credits';
import productTypeDefs from './data/productTypeDefinitions';
import { NAME } from './constants';

const productsByType = {
  clusterPack: clusterPacks,
  creditPack: creditPacks,
};

export const detailModal = buildModalSelectors(NAME, 'detail');

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

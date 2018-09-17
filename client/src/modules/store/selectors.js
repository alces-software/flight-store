import { createSelector } from 'reselect';
import { modals } from 'flight-reactware';

import clusterPacks from './data/packs';
import { NAME } from './constants';

function buildModalSelectors(namespace) {
  const dataSelector = modals.createModalDataSelector(NAME, namespace, 'modal');

  const selectedPackId = createSelector(
    dataSelector,
    (data) => data.payload == null ? undefined : data.payload.clusterPackId,
  );

  return {
    modalData: dataSelector,

    isModalOpen: modals.createModalSelector(NAME, namespace, 'modal'),

    clusterPack: createSelector(
      selectedPackId,
      (idx) => idx == null ? undefined : clusterPacks[idx]
    ),

    clusterPackId: selectedPackId,
  };
}

export const detailModal = buildModalSelectors('detail');
export const formModal = buildModalSelectors('form');

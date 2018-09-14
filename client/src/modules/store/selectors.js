import { createSelector } from 'reselect';
import { modals } from 'flight-reactware';

import clusterPacks from './data/packs';
import { NAME } from './constants';

const detailModalData = modals.createModalDataSelector(NAME, 'detail', 'modal');

const clusterPackIdx = createSelector(
  detailModalData,
  (data) => data.payload == null ? undefined : data.payload.clusterPackIdx,
);

export const detailModal = {
  modalData: detailModalData,

  isModalOpen: modals.createModalSelector(NAME, 'detail', 'modal'),

  clusterPack: createSelector(
    clusterPackIdx,
    (idx) => idx == null ? undefined : clusterPacks[idx]
  ),
};

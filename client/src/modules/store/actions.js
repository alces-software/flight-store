import * as selectors from './selectors';
import {
  DETAIL_MODAL_HIDDEN,
  DETAIL_MODAL_SHOWN,
} from './actionTypes';

export const detailModal = {
  show: (clusterPackIdx) => ({
    type: DETAIL_MODAL_SHOWN,
    payload: {
      clusterPackIdx,
    },
  }),

  hide: () => (dispatch, getState) => {
    const existingModalData = selectors.detailModal.modalData(getState());

    return dispatch({
      type: DETAIL_MODAL_HIDDEN,
      ...existingModalData,
    });
  },
};



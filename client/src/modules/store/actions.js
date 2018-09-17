import * as selectors from './selectors';
import * as actionTypes from './actionTypes';

function buildModalActions(selector, showType, hideType) {
  return {
    show: (clusterPackId) => ({
      type: showType,
      payload: {
        clusterPackId,
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

export const detailModal = buildModalActions(
  selectors.detailModal,
  actionTypes.DETAIL_MODAL_SHOWN,
  actionTypes.DETAIL_MODAL_HIDDEN
);

export const formModal = buildModalActions(
  selectors.formModal,
  actionTypes.FORM_MODAL_SHOWN,
  actionTypes.FORM_MODAL_HIDDEN
);

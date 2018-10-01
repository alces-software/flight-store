import * as selectors from './selectors';
import * as actionTypes from './actionTypes';

function buildModalActions(selector, showType, hideType) {
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

export function submissionStarted() {
  return {
    type: actionTypes.SUBMIT_STARTED,
  };
}

export function submissionSucceeded() {
  return {
    type: actionTypes.SUBMIT_SUCCEEDED,
  };
}

export function submissionFailed() {
  return {
    type: actionTypes.SUBMIT_FAILED,
  };
}

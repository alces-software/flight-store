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

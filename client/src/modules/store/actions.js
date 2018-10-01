import { SubmissionError } from 'redux-form';

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

const urls = {
  charge: "http://localhost:4008/charges",
  subscription: "http://localhost:4008/subscriptions",
};

export function purchase(values, props) {
  return async (dispatch) => {
    try {
      const { authToken, product, stripe } = props;
      const { token, error } = await stripe.createToken({
        name: values.nameOnCard,
        /* eslint-disable camelcase */
        address_city: values.addressCity,
        address_country: values.addressCountry,
        address_line1: values.addressLine1,
        address_line2: values.addressLine2,
        address_state: values.addressState,
        /* eslint-enable camelcase */
      });
      if (error) {
        throw new SubmissionError({ _error: error });
      }
      const url = urls[product.stripe.type];
      const response = await fetch(url, {
        credentials: 'include',
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          token: token.id,
          product: product,
        }),
      });

      if (response.ok) {
        return response;
      } else {
        const errors = await response.json();
        throw new SubmissionError({ _error: errors });
      }
    } catch (e) {
      if (e.constructor === SubmissionError) {
        throw e;
      } else if (e.constructor === Error) {
        throw e;
      } else {
        throw new Error(e);
      }
    }
  };
}

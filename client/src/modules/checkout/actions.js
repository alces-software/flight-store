import { SubmissionError } from 'redux-form';

import { buildModalActions } from '../../utils/modals';

import * as selectors from './selectors';
import * as actionTypes from './actionTypes';

export const modal = buildModalActions(
  selectors.modal,
  actionTypes.MODAL_SHOWN,
  actionTypes.MODAL_HIDDEN
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

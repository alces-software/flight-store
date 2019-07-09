import { SubmissionError } from 'redux-form';

import store from '../store';
import utils from '../utils';

import * as actionTypes from './actionTypes';
import * as selectors from './selectors';
import { API_BASE_URL } from './constants';

export const modal = utils.modals.buildModalActions(
  selectors.modal,
  actionTypes.MODAL_SHOWN,
  actionTypes.MODAL_HIDDEN
);

const urls = {
  charge: `${API_BASE_URL}/charges`,
  subscription: `${API_BASE_URL}/subscriptions`,
};

export function purchase(values, props) {
  return async (dispatch, getState) => {
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
          product_file: store.selectors.filename(getState()), // eslint-disable-line camelcase
          product_identifier: product.identifier, // eslint-disable-line camelcase
          product: product,
        }),
      });

      if (response.redirected) {
        window.location = response.url;
      } else if (response.ok) {
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

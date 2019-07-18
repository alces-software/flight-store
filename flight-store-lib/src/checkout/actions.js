import { SubmissionError } from 'redux-form';

import constants from '../constants';
import store from '../store';
import utils from '../utils';

import * as actionTypes from './actionTypes';
import * as selectors from './selectors';

export const modal = utils.modals.buildModalActions(
  selectors.modal,
  actionTypes.MODAL_SHOWN,
  actionTypes.MODAL_HIDDEN
);

const urls = {
  charge: '/charges',
  subscription: '/subscriptions',
};

function urlFor(type, getState) {
  const apiBase = constants.selectors.get(getState(), { name: 'API_BASE_URL' });
  return `${apiBase}${urls[type]}`;
}

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
      const url = urlFor(product.stripe.type, getState);
      const response = await fetch(url, {
        credentials: 'include',
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          token: token.id,
          product: {
            filename: store.selectors.filename(getState()),
            identifier: product.identifier,
            type: product.type,
          },
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

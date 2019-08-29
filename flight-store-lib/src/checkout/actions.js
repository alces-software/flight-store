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

function getApiBase(getState) {
  return constants.selectors.get(getState(), { name: 'API_BASE_URL' });
}

function urlFor(type, apiBase) {
  return `${apiBase}${urls[type]}`;
}

export function purchase(values, props) {
  return async (dispatch, getState) => {
    try {
      const { authToken, product, stripe } = props;
      const { nameOnCard } = values;

      const { paymentMethod, error } = await stripe
        .createPaymentMethod('card', { billing_details: { name: nameOnCard } });
      if (error) {
        throw new SubmissionError({ _error: error });
      }

      const apiBase = getApiBase(getState);
      const url = urlFor(product.stripe.type, apiBase);
      const response = await fetch(url, {
        credentials: 'include',
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          payment_method_id: paymentMethod.id,
          product: {
            filename: store.selectors.filename(getState()),
            identifier: product.identifier,
            type: product.type,
          },
        }),
      });

      return await handleServerResponse(stripe, url, authToken)(response);

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

function handleServerResponse(stripe, url, authToken) {
  return async function doHandleServerResponse(response) {
    if (response.redirected) {
      // We've redirected, we must be all done.
      window.location = response.url;
      return;
    }
    if (response.status === 204) {
      // A no content response, we must be all done.
      return response;
    }

    if (!response.ok) {
      throw new SubmissionError({ _error: await response.json() });

    } else {
      const json = await response.json();
      if (!json.requires_action) {
        // No action required, we're all done.
        return response;

      } else {
        const { error, paymentIntent } = await stripe
          .handleCardAction(json.payment_intent_client_secret);

        if (error) {
          throw new SubmissionError({ _error: error });
        } else {
          const serverResponse = await fetch(url, {
            credentials: 'include',
            method: 'POST',
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${authToken}`,
            },
            body: JSON.stringify({ payment_intent_id: paymentIntent.id }),
          });
          return await doHandleServerResponse(serverResponse);
        }
      }
    }
  }
}

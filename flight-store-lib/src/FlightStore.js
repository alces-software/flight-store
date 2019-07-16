import React from 'react';
import Cookies from 'universal-cookie';
import { createCookieMiddleware } from 'redux-cookie';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import { StripeProvider } from 'react-stripe-elements';

import createReducers from './reducers';
import middleware from './middleware';
import createLogics from './logics';
import { checkout, constants, store } from './modules';

const cookies = new Cookies();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reduxStore = createStore(
  createReducers(cookies),
  composeEnhancers(
    applyMiddleware(
      ...middleware,
      createCookieMiddleware(cookies),
    )
  )
);

createLogics(reduxStore);


const FlightStore = ({
  apiBaseUrl,
  defaultProductsFile,
  productType,
  productsUrlPrefix,
  ssoUserRequired,
  stripeApiKey,
  vatRate,
}) => {
  reduxStore.dispatch(constants.actions.set('API_BASE_URL', apiBaseUrl));
  reduxStore.dispatch(constants.actions.set('PRODUCTS_URL_PREFIX', productsUrlPrefix));
  reduxStore.dispatch(constants.actions.set('DEFAULT_PRODUCTS_FILE', defaultProductsFile));
  reduxStore.dispatch(constants.actions.set('VAT_RATE', vatRate));
  reduxStore.dispatch(constants.actions.set('SSO_USER_REQUIRED', ssoUserRequired != undefined));
  return (
    <Provider store={reduxStore}>
      <StripeProvider apiKey={stripeApiKey}>
        <store.Context>
          <store.pages.Products
            CheckoutModal={checkout.CheckoutModal}
            ShowCheckoutFormButton={checkout.ShowCheckoutFormButton}
            productType={productType}
          />
        </store.Context>
      </StripeProvider>
    </Provider>
  );
};

export default FlightStore;

import React from 'react';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import { StripeProvider } from 'react-stripe-elements';
import { withProps } from 'recompose';

import createReducers from './reducers';
import middleware from './middleware';
import createLogics from './logics';
import { checkout, constants, store } from './modules';
import * as Auth from './AuthContext';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const reduxStore = createStore(
  createReducers(),
  composeEnhancers(
    applyMiddleware(
      ...middleware,
    )
  )
);

createLogics(reduxStore);


const FlightStore = ({
  apiBaseUrl,
  defaultProductsFile,
  emphasisBreakPoint,
  getAuthToken,
  getCurrentUser,
  productType,
  productsUrlPrefix,
  showLoginForm,
  ssoUserRequired,
  stripeApiKey,
  vatRate,
}) => {
  reduxStore.dispatch(constants.actions.set('API_BASE_URL', apiBaseUrl));
  reduxStore.dispatch(constants.actions.set('PRODUCTS_URL_PREFIX', productsUrlPrefix));
  reduxStore.dispatch(constants.actions.set('DEFAULT_PRODUCTS_FILE', defaultProductsFile));
  reduxStore.dispatch(constants.actions.set('VAT_RATE', vatRate));
  reduxStore.dispatch(constants.actions.set('EMPHASIS_BREAK_POINT', emphasisBreakPoint));

  const auth = {
    getAuthToken,
    getCurrentUser,
    showLoginForm,
    ssoUserRequired,
  };

  return (
    <Provider store={reduxStore}>
      <Auth.Provider value={auth}>
        <StripeProvider apiKey={stripeApiKey}>
          <store.Context>
            <store.pages.Products
              CheckoutModal={checkout.CheckoutModal}
              ShowCheckoutFormButton={checkout.ShowCheckoutFormButton}
              productType={productType}
            />
          </store.Context>
        </StripeProvider>
      </Auth.Provider>
    </Provider>
  );
};

export default FlightStore;

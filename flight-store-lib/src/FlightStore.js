import React from 'react';
import Cookies from 'universal-cookie';
import { createBrowserHistory as createHistory } from 'history';
import { createCookieMiddleware } from 'redux-cookie';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import { StripeProvider } from 'react-stripe-elements';
import { withProps } from 'recompose';

import createReducers from './reducers';
import middleware from './middleware';
import createLogics from './logics';
import { checkout, constants, store } from './modules';

const cookies = new Cookies();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const history = createHistory();

const reduxStore = createStore(
  createReducers(cookies, history),
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
  emphasisBreakPoint,
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
  reduxStore.dispatch(constants.actions.set('SSO_USER_REQUIRED', ssoUserRequired != undefined));
  reduxStore.dispatch(constants.actions.set('EMPHASIS_BREAK_POINT', emphasisBreakPoint));
  const CheckoutModal = withProps({showLoginForm: showLoginForm })(checkout.CheckoutModal);

  return (
    <Provider store={reduxStore}>
      <StripeProvider apiKey={stripeApiKey}>
        <store.Context>
          <store.pages.Products
            CheckoutModal={CheckoutModal}
            ShowCheckoutFormButton={checkout.ShowCheckoutFormButton}
            productType={productType}
          />
        </store.Context>
      </StripeProvider>
    </Provider>
  );
};

export default FlightStore;

import React from 'react';
import Cookies from 'universal-cookie';
import { createCookieMiddleware } from 'redux-cookie';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import { StripeProvider } from 'react-stripe-elements';

import createReducers from './reducers';
import middleware from './middleware';
import createLogics from './logics';
import { checkout, store } from './modules';

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
  productType,
  stripeApiKey,
}) => (
  <Provider store={reduxStore}>
    <StripeProvider apiKey={stripeApiKey || process.env.REACT_APP_STRIPE_API_KEY}>
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

export default FlightStore;

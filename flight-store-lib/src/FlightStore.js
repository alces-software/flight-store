import Cookies from 'universal-cookie';
import { createCookieMiddleware } from 'redux-cookie';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import { StripeProvider } from 'react-stripe-elements';

import createReducers from './reducers';
import middleware from './middleware';

const cookies = new Cookies();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  createReducers(cookies),
  composeEnhancers(
    applyMiddleware(
      ...middleware,
      createCookieMiddleware(cookies),
    )
  )
);

createLogics(store);


const FlightStore = () => (
  <Provider store={store}>
    <StripeProvider apiKey={process.env.REACT_APP_STRIPE_API_KEY}>
      <div>
        Just a test so far
      </div>
    </StripeProvider>
  </Provider>
);

export default FlightStore;

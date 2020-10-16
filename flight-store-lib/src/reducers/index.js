import { compose } from 'redux';
import { jsonApi, loadingStates, reducerUtils } from 'flight-reactware';
import { reducer as formReducer } from 'redux-form';
import { combineReducers } from 'redux';

import * as modules from '../modules';

const entityIndexes = Object.keys(modules).reduce(
  (accum, name) => accum.concat(modules[name].indexes || []),
  [],
);

const loadingStatesConfig = Object.keys(modules).reduce(
  (accum, name) => {
    const c = modules[name].loadingStatesConfig;
    if (c) {
      accum.push(c);
    }
    return accum;
  },
  [],
);

const moduleReducers = Object.keys(modules).reduce(
  (accum, name) => {
    const m = modules[name];
    if (m.reducer) {
      accum[m.constants.NAME] = m.reducer;
    }
    return accum;
  },
  {},
);

const createAppReducers = () => ({
  ...moduleReducers,
  entities: compose(
    jsonApi.withIndexes(entityIndexes),
    loadingStates.withLoadingStates(loadingStatesConfig),
  )(jsonApi.reducer),
  form: formReducer,
});

export default () => {
  const appReducers = combineReducers(createAppReducers());
  return reducerUtils.withStateResetting({
    keepStateSlices: [ 'router' ],
    // This needs to be consistent with the redux action type used to log a
    // user out of Flight SSO.  Currently, this has been copied from
    // FlightAccountMenu.
    // XXX Take this as a dependency somehow.  Preferably without adding a
    // dependency on FlightAccountMenu.
    resetOn: [ '@flight/auth/LOGOUT' ],
  })(appReducers);
};

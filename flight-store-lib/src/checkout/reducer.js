import { combineReducers } from 'redux';
import { modals } from 'flight-reactware';

import { MODAL_HIDDEN, MODAL_SHOWN } from './actionTypes';

const initialFormState = {};

function formReducer(state=initialFormState, { type, meta }) {
  if (type === '@@redux-form/SET_SUBMIT_SUCCEEDED' && meta.form === 'checkout') {
    return {
      ...state,
      submitSucceeded: true,
    };
  } else if (type === MODAL_SHOWN) {
    return initialFormState;
  } else {
    return state;
  }
}

const reducer = combineReducers({
  modal: modals.createModalReducer(MODAL_SHOWN, MODAL_HIDDEN),
  state: formReducer,
});

export default reducer;

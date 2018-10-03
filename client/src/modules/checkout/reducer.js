import { combineReducers } from 'redux';
import { modals } from 'flight-reactware';

import { MODAL_HIDDEN, MODAL_SHOWN } from './actionTypes';

const initialFormState = {};

function formReducer(state=initialFormState, { type }) {
  switch (type) {
    case '@@redux-form/SET_SUBMIT_SUCCEEDED':
      return {
        ...state,
        submitSucceeded: true,
      };

    case MODAL_SHOWN:
      return initialFormState;

    default:
      return state;
  }
}

const reducer = combineReducers({
  modal: modals.createModalReducer(MODAL_SHOWN, MODAL_HIDDEN),
  state: formReducer,
});

export default reducer;

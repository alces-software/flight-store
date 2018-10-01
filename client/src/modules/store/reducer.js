import { combineReducers } from 'redux';
import { modals } from 'flight-reactware';

import {
  DETAIL_MODAL_HIDDEN,
  DETAIL_MODAL_SHOWN,
  FORM_MODAL_HIDDEN,
  FORM_MODAL_SHOWN,
} from './actionTypes';

const initialFormState = {};

function formReducer(state=initialFormState, { type }) {
  switch (type) {
    case '@@redux-form/SET_SUBMIT_SUCCEEDED':
      return {
        ...state,
        submitSucceeded: true,
      };

    case FORM_MODAL_SHOWN:
      return initialFormState;

    default:
      return state;
  }
}

const reducer = combineReducers({
  detail: combineReducers({
    modal: modals.createModalReducer(DETAIL_MODAL_SHOWN, DETAIL_MODAL_HIDDEN),
  }),
  form: combineReducers({
    modal: modals.createModalReducer(FORM_MODAL_SHOWN, FORM_MODAL_HIDDEN),
    state: formReducer,
  }),
});

export default reducer;

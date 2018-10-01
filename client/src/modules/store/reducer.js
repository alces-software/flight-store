import { combineReducers } from 'redux';
import { modals } from 'flight-reactware';

import {
  DETAIL_MODAL_HIDDEN,
  DETAIL_MODAL_SHOWN,
  FORM_MODAL_HIDDEN,
  FORM_MODAL_SHOWN,
  SUBMIT_STARTED,
  SUBMIT_SUCCEEDED,
  SUBMIT_FAILED,
} from './actionTypes';

function formReducer(state={}, { type }) {
  switch (type) {
    case SUBMIT_STARTED:
      return {
        ...state,
        submitting: true,
      };

    case SUBMIT_SUCCEEDED:
      return {
        ...state,
        submitting: false,
        submitFailed: false,
        submitSucceeded: true,
      };

    case SUBMIT_FAILED:
      return {
        ...state,
        submitting: false,
        submitFailed: true,
        submitSucceeded: false,
      };

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

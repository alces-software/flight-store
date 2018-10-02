import { combineReducers } from 'redux';
import { modals } from 'flight-reactware';

import {
  DETAIL_MODAL_HIDDEN,
  DETAIL_MODAL_SHOWN,
} from './actionTypes';

const reducer = combineReducers({
  detail: combineReducers({
    modal: modals.createModalReducer(DETAIL_MODAL_SHOWN, DETAIL_MODAL_HIDDEN),
  }),
});

export default reducer;

import { buildModalActions } from '../../utils/actions';

import * as selectors from './selectors';
import * as actionTypes from './actionTypes';

export const detailModal = buildModalActions(
  selectors.detailModal,
  actionTypes.DETAIL_MODAL_SHOWN,
  actionTypes.DETAIL_MODAL_HIDDEN
);

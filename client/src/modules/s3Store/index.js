/*=============================================================================
 * Copyright (C) 2018 Stephen F. Norledge and Alces Flight Ltd.
 *
 * This file is part of Flight Store.
 *
 * All rights reserved, see LICENSE.txt.
 *===========================================================================*/

// Import and export the public facing API for this module.

import * as actions from './actions';
import * as constants from './constants';
import reducer from './reducer';
import * as selectors from './selectors';

export default {
  actions,
  constants,
  reducer,
  selectors,
};

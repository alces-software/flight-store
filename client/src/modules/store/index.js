/*=============================================================================
 * Copyright (C) 2018 Stephen F. Norledge and Alces Flight Ltd.
 *
 * This file is part of Flight Store.
 *
 * All rights reserved, see LICENSE.txt.
 *===========================================================================*/

// Import and export the public facing API for this module.

import * as constants from './constants';
import * as pages from './pages';
import * as selectors from './selectors';
import reducer from './reducer';

export default {
  constants,
  pages,
  reducer,
  selectors,
};

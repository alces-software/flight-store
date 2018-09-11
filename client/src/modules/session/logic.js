/*=============================================================================
 * Copyright (C) 2017-2018 Stephen F. Norledge and Alces Flight Ltd.
 *
 * This file is part of Flight Launch.
 *
 * All rights reserved, see LICENSE.txt.
 *===========================================================================*/

// Business logic handling sessions.

import { auth } from 'flight-reactware';

// import centerUsers from '../../modules/centerUsers';

// let previousSsoUser;
// function loadUserWhenAuthChanges(dispatch, getState) {
//   const ssoUser = auth.selectors.currentUserSelector(getState());
//   if (ssoUser == null) {
//     previousSsoUser = null;
//     return;
//   }
//   const previousId = previousSsoUser == null ? null : previousSsoUser.flight_id;
//   if (ssoUser.flight_id !== previousId) {
//     previousSsoUser = ssoUser;
//     if (ssoUser != null) {
//       const promise = dispatch(centerUsers.actions.loadUser(ssoUser.username));
//       if (promise) { promise.catch(e => e); }
//     }
//   }
// };


export default [
  auth.logic.checkSessionExpiration,
  // loadUserWhenAuthChanges,
];

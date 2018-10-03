import React from 'react';

import SignInLink from './SignInLink';

const MustLoginMessage = () => {
  return (
    <p>
      You must be signed in to your Alces Flight account in order to purchase
      any products from Alces Flight Store. Please{' '}
      <SignInLink>
        sign in
      </SignInLink>
      {' '}and try again.
    </p>
  );
};

MustLoginMessage.propTypes = { };

export default MustLoginMessage;

import React from 'react';
import { auth } from 'flight-reactware';

const MustLoginMessage = () => {
  return (
    <p>
      You must be signed in to your Alces Flight account in order to purchase
      any products from Alces Flight Store. Please{' '}
      <auth.SignInLink>
        sign in
      </auth.SignInLink>
      {' '}and try again.
    </p>
  );
};

MustLoginMessage.propTypes = { };

export default MustLoginMessage;

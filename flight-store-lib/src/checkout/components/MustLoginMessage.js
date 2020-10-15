import React from 'react';
import { Button } from 'reactstrap';

const MustLoginMessage = ({ showLoginForm }) => {
  showLoginForm = showLoginForm == null ? () => {} : showLoginForm;
  return (
    <p>
      You must be signed in to your Alces Flight account in order to purchase
      any products from Alces Flight Store. Please{' '}
      <a
        className="btn btn-link"
        href="/sign-in"
        onClick={(evt) => { showLoginForm(); evt.preventDefault(); }}
        size="md"
        style={{ verticalAlign: 'baseline', padding: 0 }}
      >
        sign in
      </a>
      {' '}and try again.
    </p>
  );
};

MustLoginMessage.propTypes = { };

export default MustLoginMessage;

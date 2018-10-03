import React from 'react';
import PropTypes from 'prop-types';

const ErrorMessage = ({ error }) => {
  switch (error.type) {
    case 'card_error':
      return (
        <p className='text-warning'>
          A problem has been encountered when trying to charge your card.  The
          message was "{error.message}"
        </p>
      );

    default:
      return (
        <p className='text-warning'>
          An unexpected problem has been encountered when trying to charge
          your card.
        </p>
      );
  }
};

ErrorMessage.propTypes = {
  error: PropTypes.shape({
    message: PropTypes.string,
    type: PropTypes.string.isRequired,
  }).isRequired,
};

export default ErrorMessage;

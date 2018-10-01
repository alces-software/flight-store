import FontAwesome from 'react-fontawesome';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { StatefulButton } from 'flight-reactware';

import * as selectors from '../selectors';

const PurchaseButton = ({ isSubmitting, onClick }) => (
  <StatefulButton
    color="primary"
    disabled={isSubmitting}
    onClick={onClick}
    submitting={isSubmitting}
  >
    Purchase{' '}
    <FontAwesome
      fixedWidth
      name="credit-card"
    />
  </StatefulButton>
);

PurchaseButton.propTypes = {
  isSubmitting: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

const enhance = (
  connect(createStructuredSelector({
    isSubmitting: selectors.isSubmitting,
  }))
);

export default enhance(PurchaseButton);

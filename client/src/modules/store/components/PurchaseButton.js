import FontAwesome from 'react-fontawesome';
import PropTypes from 'prop-types';
import React from 'react';
import { Button } from 'reactstrap';

const PurchaseButton = ({ onClick }) => (
  <Button
    color="primary"
    onClick={onClick}
    outline
  >
    Purchase{' '}
    <FontAwesome
      fixedWidth
      name="credit-card"
    />
  </Button>
);

PurchaseButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default PurchaseButton;

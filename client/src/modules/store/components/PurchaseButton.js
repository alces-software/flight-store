import FontAwesome from 'react-fontawesome';
import React from 'react';
import { Button } from 'reactstrap';

const PurchaseButton = () => (
  <Button
    block
    color="primary"
    outline
    size="lg"
  >
    Purchase{' '}
    <FontAwesome
      fixedWidth
      name="credit-card"
    />
  </Button>
);

export default PurchaseButton;

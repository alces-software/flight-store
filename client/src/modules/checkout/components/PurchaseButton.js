import FontAwesome from 'react-fontawesome';
import React from 'react';
import { ReduxFormSubmitButton as SubmitButton } from 'flight-reactware';

const PurchaseButton = () => (
  <SubmitButton
    color="primary"
    form="checkout"
  >
    Purchase{' '}
    <FontAwesome
      fixedWidth
      name="credit-card"
    />
  </SubmitButton>
);

export default PurchaseButton;

import { validation as v } from 'flight-reactware';

// Validation for the card is performed in the CardElement component in order
// to provide integration between redux and react-stripe-elements.
export const checkoutValidator = v.createValidator({
  nameOnCard: [
    v.required,
    v.notBlank,
  ],
});

import { validation as v } from 'flight-reactware';

export const checkoutValidator = v.createValidator({
  nameOnCard: [
    v.required,
    v.notBlank,
  ],

  // Validation for the card is performed in the CardElement component in
  // order to provide integration between redux and react-stripe-elements.
});

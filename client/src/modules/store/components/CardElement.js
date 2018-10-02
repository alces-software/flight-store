import PropTypes from 'prop-types';
import React from 'react';
import { CardElement as StripeCardElement } from 'react-stripe-elements';
import { Field, reduxForm } from 'redux-form';
import { FormGroup, Label } from 'reactstrap';
import { FormInput } from 'flight-reactware';
import { compose, withStateHandlers } from 'recompose';

let tick = 0;

// An element to aid in integrating react-stripe-elements and redux-form.
//
// The integration that we need is to ensure that redux form's validation
// state is updated each time the card is changed.  We accomplish this by:
//
//  1. Adding an `onChange` handler to the `StripeCardElement` which:
//    a. Grabs the error, if any and stores it in some state.
//    b. Runs `reduxFormChangeHandler` to cause redux-form to run the
//       validation functions and update its validation state.
//
//  2. Adding a `validate` function to `Field` which takes the error message
//     stored in the state and makes it available to `redux-form`.
//
//  3. Display the error message, if any, stored in the state in a `Feedback`
//     element.
//
// The value passed to `reduxFormChangeHandler` doesn't matter as long as it
// is different from the last value provided.  The actual credit card number
// is handled entirely by stripe, without us ever having access to it in our
// code.
const CardElement = ({
  cardErrorHandler,
  cardErrors,
  change: reduxFormChangeHandler,
}) => (
  <FormGroup>
    <Label>Card details</Label>
    <StripeCardElement
      className="form-control"
      onChange={(payload) => {
        cardErrorHandler(payload);
        reduxFormChangeHandler('card', (tick += 1).toString());
      }}
    />
    <Field
      component={() => null}
      name="card"
      validate={() => cardErrors && cardErrors.message}
    />
    {
      cardErrors ?
        <FormInput.Feedback>{cardErrors.message}</FormInput.Feedback> :
        <FormInput.Feedback />
    }
  </FormGroup>
);

CardElement.propTypes = {
  cardErrorHandler: PropTypes.func.isRequired,
  cardErrors: PropTypes.object,
  change: PropTypes.func.isRequired,
};

const enhance = compose(
  withStateHandlers(
    { cardErrors: undefined },
    {
      cardErrorHandler: () => (payload) => {
        return {
          cardErrors: payload.error,
        };
      },
    },
  ),

  reduxForm({ form: 'checkout' }),
);

export default enhance(CardElement);

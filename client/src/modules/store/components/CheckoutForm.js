import React from 'react';
import { CardElement, injectStripe } from 'react-stripe-elements';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  Form,
  FormGroup,
  FormText,
  Label,
} from 'reactstrap';
import { auth, FormInput } from 'flight-reactware';
import {
  Field,
  propTypes as formPropTypes,
  reduxForm,
} from 'redux-form';

import * as actions from '../actions';
import CheckoutErrorMessage from './CheckoutErrorMessage';

const CheckoutForm = ({ error, handleSubmit, submitFailed }) => (
  <Form onSubmit={handleSubmit}>
    { 
      error ? <CheckoutErrorMessage error={error} /> : null
    }
    { 
      submitFailed && !error ? (
        <p className='text-warning'>
          Please correct the errors below and try again.
        </p>
      ) : null
    }
    <FormText>
      You will be charged £xxx now and each month until you cancel your
      subscription.
    </FormText>

    <FormGroup>
      <Label>Card details</Label>
      <CardElement className="form-control" />
    </FormGroup>

    <FormGroup>
      <Field
        component={FormInput}
        id="nameOnCard"
        label="Name on card"
        name="nameOnCard"
        type="text"
      />
    </FormGroup>
  </Form>
);

CheckoutForm.propTypes = {
  ...formPropTypes,
};

const enhance = compose(
  (component) => injectStripe(component),

  connect(createStructuredSelector({
    authToken: auth.selectors.ssoToken,
  })),

  reduxForm({
    destroyOnUnmount: false,
    form: 'checkout',
    onSubmit: (values, dispatch, props) => {
      return dispatch(actions.purchase(values, props));
    },
    // validate: confirmPasswordValidator,
  })
);

export default enhance(CheckoutForm);

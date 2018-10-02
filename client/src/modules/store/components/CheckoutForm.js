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
  Table,
} from 'reactstrap';
import { auth, FormInput } from 'flight-reactware';
import {
  Field,
  propTypes as formPropTypes,
  reduxForm,
} from 'redux-form';
import styled from 'styled-components';

import * as actions from '../actions';
import CheckoutErrorMessage from './CheckoutErrorMessage';

// Our current versions of bootstrap and reactstrap don't support borderless
// tables.  Let's add support here.
const BorderlessTable = styled(Table)`
  th,
  td,
  thead th,
  tbody + tbody {
    border: 0;
  }
`;

const CheckoutForm = ({ error, handleSubmit, product, submitFailed }) => (
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
      Enter your credit card details below and click <em>Purchase</em> to
      continue.
    </FormText>

    <BorderlessTable size="sm">
      <thead>
        <tr>
          <th>Product</th>
          <th>Quantity</th>
          <th>Cost</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{product.name}</td>
          <td>1</td>
          <td>{product.cost.unit}{product.cost.amount}</td>
        </tr>
      </tbody>
    </BorderlessTable>

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

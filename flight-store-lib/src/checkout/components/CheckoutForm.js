import React from 'react';
import { injectStripe } from 'react-stripe-elements';
import { compose, fromRenderProps } from 'recompose';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  Form,
  FormGroup,
  FormText,
} from 'reactstrap';
import { FormInput, HiddenButton } from 'flight-reactware';
import {
  Field,
  propTypes as formPropTypes,
  reduxForm,
} from 'redux-form';

import constants from '../../constants';
import * as Auth from '../../AuthContext';

import * as actions from '../actions';
import ErrorMessage from './ErrorMessage';
import CardElement from './CardElement';
import { checkoutValidator } from '../validations';
import Table from './Table';

const CheckoutForm = ({
  change,
  error,
  handleSubmit,
  invalid,
  pristine,
  product,
  submitFailed,
  submitting,
  vatRate,
}) => {
  const quantity = 1;
  const vatPercentage = vatRate / 100;
  const vatCharged = product.cost.amount * quantity * vatPercentage;
  const totalAmount = product.cost.amount * quantity + vatCharged;

  return (
    <Form onSubmit={handleSubmit}>
      { 
        error ? <ErrorMessage error={error} /> : null
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

      <Table
        borderless
        size="sm"
      >
        <thead>
          <tr>
            <th>Product</th>
            <th>Quantity</th>
            <th>Unit cost</th>
            { product.cost.includesVAT ? null : <th>VAT</th> }
            <th>Total cost</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{product.name}</td>
            <td>{quantity}</td>
            <td>{product.cost.unit}{product.cost.amount}</td>
            {
              product.cost.includesVAT ?
                null :
                <td>
                  {product.cost.unit}{vatCharged}
                </td>
            }
            <td>{product.cost.unit}{totalAmount}</td>
          </tr>
        </tbody>
      </Table>

      <CardElement reduxFormChangeHandler={change} />

      <FormGroup>
        <Field
          component={FormInput}
          id="nameOnCard"
          label="Name on card"
          name="nameOnCard"
          type="text"
        />
      </FormGroup>

      <HiddenButton
        disabled={submitting || invalid || pristine}
        type='submit'
      >
        Purchase
      </HiddenButton>
    </Form>
  );
};

CheckoutForm.propTypes = {
  ...formPropTypes,
};

const enhance = compose(
  (component) => injectStripe(component),

  connect(createStructuredSelector({
    vatRate: (state) => constants.selectors.get(state, { name: 'VAT_RATE' }),
  })),

  // Provide the authToken as a regular prop.  It is required by the
  // `purchase` action.
  fromRenderProps(Auth.Consumer, ({ getAuthToken }) => ({ authToken: getAuthToken() })),

  reduxForm({
    destroyOnUnmount: false,
    form: 'checkout',
    onSubmit: (values, dispatch, props) => {
      return dispatch(actions.purchase(values, props));
    },
    validate: checkoutValidator,
  }),
);

export default enhance(CheckoutForm);

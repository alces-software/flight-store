import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { CardElement, injectStripe } from 'react-stripe-elements';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  Form,
  FormGroup,
  FormText,
  Input,
  Label,
} from 'reactstrap';
import { auth } from 'flight-reactware';

import * as actions from '../actions';

const urls = {
  charge: "http://localhost:4008/charges",
  subscription: "http://localhost:4008/subscriptions",
};

class CheckoutForm extends Component {
  static propTypes = {
    product: PropTypes.object.isRequired,
    stripe: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit(ev) {
    const { authToken, dispatch, product, stripe } = this.props;
    dispatch(actions.submissionStarted());

    const { token } = await stripe.createToken({
      name: this.name.value,
      /* eslint-disable camelcase */
      address_city: this.addressCity.value,
      address_country: this.addressCountry.value,
      address_line1: this.addressLine1.value,
      address_line2: this.addressLine2.value,
      address_state: this.addressState.value,
      // address_zip: this.addressZip.value,
      /* eslint-enable camelcase */
    });
    console.log('token:', token);  // eslint-disable-line no-console
    // XXX token might be invalid.  Need to check success or otherwise of
    // createToken.
    const url = urls[product.stripe.type];
    const response = await fetch(url, {
      credentials: 'include',
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${authToken}`,
      },
      body: JSON.stringify({
        token: token.id,
        product: product,
      }),
    });

    if (response.ok) {
      dispatch(actions.submissionSucceeded());
    } else {
      dispatch(actions.submissionFailed());
    }
  }

  render() {
    return (
      <Form>
        <FormText>
          You will be charged £xxx now and each month until you cancel your
          subscription.
        </FormText>

        <FormGroup>
          <Label>Card details</Label>
          <CardElement className="form-control" />
        </FormGroup>

        <FormGroup>
          <Label for="nameOnCard">Name on card</Label>
          <Input
            id="nameOnCard"
            innerRef={el => this.name = el}
            name="nameOnCard"
            type="text"
          />
        </FormGroup>

        <FormText>
          Billing address
        </FormText>
        <FormGroup>
          <Label for="addressLine1">Line 1</Label>
          <Input
            id="addressLine1"
            innerRef={el => this.addressLine1 = el}
            name="addressLine1"
            type="text"
          />
        </FormGroup>

        <FormGroup>
          <Label for="addressLine2">Line 2</Label>
          <Input
            id="addressLine2"
            innerRef={el => this.addressLine2 = el}
            name="addressLine2"
            type="text"
          />
        </FormGroup>

        <FormGroup>
          <Label for="addressCity">Town/City</Label>
          <Input
            id="addressCity"
            innerRef={el => this.addressCity = el}
            name="addressCity"
            type="text"
          />
        </FormGroup>

        <FormGroup>
          <Label for="addressState">County</Label>
          <Input
            id="addressState"
            innerRef={el => this.addressState = el}
            name="addressState"
            type="text"
          />
        </FormGroup>

        <FormGroup>
          <Label for="addressCountry">Country</Label>
          <Input
            id="addressCountry"
            innerRef={el => this.addressCountry = el}
            name="addressCountry"
            type="text"
          />
        </FormGroup>
      </Form>
    );
  }
}

const enhance = compose(
  (component) => injectStripe(component, { withRef: true }),

  connect(createStructuredSelector({
    authToken: auth.selectors.ssoToken,
  }), null, null, { withRef: true }),
);

export default enhance(CheckoutForm);

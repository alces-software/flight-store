import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { CardElement, injectStripe } from 'react-stripe-elements';
import {
  Form,
  FormGroup,
  FormText,
  Input,
  Label,
} from 'reactstrap';

class CheckoutForm extends Component {
  static propTypes = {
    stripe: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit(ev) {
    // User clicked submit

    const { token } = await this.props.stripe.createToken({
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
    // const response = await fetch("/charge", {
    //   method: "POST",
    //   headers: {"Content-Type": "text/plain"},
    //   body: token.id
    // });

    // if (response.ok) console.log("Purchase Complete!")
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

        {/*
        <FormGroup>
          <Label for="addressZip">Zip</Label>
          <Input
            id="addressZip"
            innerRef={el => this.addressZip = el}
            name="addressZip"
            type="text"
          />
        </FormGroup>
        */}
      </Form>
    );
  }
}

export default injectStripe(CheckoutForm, { withRef: true });
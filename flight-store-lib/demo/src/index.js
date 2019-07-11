import React, {Component} from 'react'
import {render} from 'react-dom'

import FlightStore from '../../src'

class Store extends Component {
  render() {
    return (
      <FlightStore
        // The stripe API key to use
        stripeApiKey={process.env.REACT_APP_STRIPE_API_KEY}
        // Optionally pass the product type to use.  Skipping this presents
        // all product types for the user to select from.
        productType="creditPacks"
      />
    );
  }
}

render(<Store/>, document.querySelector('#demo'))

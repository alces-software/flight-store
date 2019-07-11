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
        // The base URL for server that processes the checkouts. E.g.,
        // http://center.alces-flight.lvh.me:3003
        apiBaseUrl={process.env.REACT_APP_API_BASE_URL}
        // The URL prefix for the product definition file. E.g.,
        // https://alces-flight.s3.amazonaws.com/FlightStore/development-products/
        productsUrlPrefix={process.env.REACT_APP_PRODUCTS_URL_PREFIX}
        // The name of the product definition file to use by default. E.g.,
        // default.json
        defaultProductsFile={process.env.REACT_APP_DEFAULT_PRODUCTS_FILE}
        // The VAT rate to charge.
        vatRate={20}
      />
    );
  }
}

render(<Store/>, document.querySelector('#demo'))

import React, {Component} from 'react'
import {render} from 'react-dom'
import 'url-search-params-polyfill';

// Here we depend on flight-account-menu for authentication.  When embedded
// into other applications you might want to depend on something else.
import {
  AccountMenu,
  ModalContainer,
  auth,
  showLoginForm,
  store as authStore,
} from 'flight-account-menu';

import FlightStore from '../../src'

const urlParams = new URLSearchParams(window.location.search);
const defaultProductsFile = urlParams.get('products-file') || 'default.json';

function getAuthToken() {
  return auth.selectors.ssoToken(authStore.getState());
}

function getCurrentUser() {
  return auth.selectors.currentUserSelector(authStore.getState());
}

class Store extends Component {
  render() {
    return (
      <FlightStore
        // The stripe API key to use
        stripeApiKey="pk_test_qetTHATdMis7lA0V4xwcSDGk"
        // Optionally pass the product type to use.  Skipping this presents
        // all product types for the user to select from.
        productType="creditPacks"
        // The base URL for server that processes the checkouts.
        apiBaseUrl="http://store.alces-flight.lvh.me:4008"
        // The URL prefix for the product definition file.
        productsUrlPrefix="https://alces-flight.s3.amazonaws.com/FlightStore/development-products/"
        // The name of the product definition file to use by default.
        defaultProductsFile={defaultProductsFile}
        // The VAT rate to charge.
        vatRate={20}
        // The breakpoint above which cards can be emphasised.
        emphasisBreakPoint="1185px"

        // Authentication dependencies.
        getAuthToken={ getAuthToken }
        getCurrentUser={ getCurrentUser }
        showLoginForm={ showLoginForm }
        ssoUserRequired={ true }
      />
    );
  }
}

render(<Store/>, document.querySelector('#demo'))
render(<AccountMenu />, document.getElementById('flight-account-menu'));
render(<ModalContainer />, document.getElementById('flight-account-modal-container'));

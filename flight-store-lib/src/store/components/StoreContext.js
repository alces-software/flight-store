import React from 'react';
import { compose, lifecycle } from 'recompose';
import { connect } from 'react-redux';
// import { renderRoutes } from 'react-router-config';

import { loadProducts } from '../actions';

// const StoreContext = ({ route, ...rest }) => renderRoutes(route.routes, rest);

const StoreContext = ({ children, ...rest }) => children;

// Retrieve the specs file name from window.location.
//
//  - In a development build, setting the clusterSpecs parameter to `dev` will
//    use the specs given in `../data/clusterSpecs.dev.json`.
function getProductsFile(location) {
  const urlParams = new URLSearchParams(location.search);
  return urlParams.get('products');
}

const enhance = compose(
  connect(),

  lifecycle({
    componentDidMount: function() {
      const productsFile = getProductsFile(this.props.location || {});
      this.props.dispatch(loadProducts(productsFile));
    }
  }),
);

export default enhance(StoreContext);

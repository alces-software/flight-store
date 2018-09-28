/*=============================================================================
 * Copyright (C) 2018 Stephen F. Norledge and Alces Flight Ltd.
 *
 * This file is part of Flight Store.
 *
 * All rights reserved, see LICENSE.txt.
 *===========================================================================*/
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import { Container, Row, Col } from 'reactstrap';
import { PageHeading } from 'flight-reactware';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import * as selectors from '../selectors';
import CheckoutModal from '../components/CheckoutModal';
import ProductDetailModal from '../components/ProductDetailModal';
import ProductFeatureCard from '../components/ProductFeatureCard';

const ProductContainer = styled(Container)`
  padding: 0 30px 15px 30px;
`;

const ProductsPage = ({ productTypeDef, products }) => {
  return (
    <ProductContainer fluid >
      <ProductDetailModal />
      <CheckoutModal />
      <PageHeading
        overview={productTypeDef.productsPage.overview}
        sections={[]}
        title={productTypeDef.productsPage.title}
      />
      <Row>
        {
          products.map((product, idx) => (
            <Col key={product.title}>
              <ProductFeatureCard
                {...product}
                id={idx}
              />
            </Col>
          ))
        }
      </Row>
    </ProductContainer>
  );
};

ProductsPage.propTypes = {
  productTypeDef: PropTypes.shape({
    productsPage: PropTypes.shape({
      overview: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  products: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const enhance = compose(
  connect(createStructuredSelector({
    productTypeDef: selectors.productTypeDef,
    products: selectors.products,
  })),
);

export default enhance(ProductsPage);

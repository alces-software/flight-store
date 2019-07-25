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
import { CardDeck, Container, Row, Col } from 'reactstrap';
import { DelaySpinner, PageHeading } from 'flight-reactware';
import { branch, compose, renderComponent } from 'recompose';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import * as selectors from '../selectors';
import ProductDetailModal from '../components/ProductDetailModal';
import ProductFeatureCard from '../components/ProductFeatureCard';

const Deck = styled(CardDeck)`
  &.card-deck {
    justify-content: center;
    .card {
      min-width: 350px;
      flex-grow: 0;
      margin-top: 1.5rem;
    }
  }
`;

const ProductContainer = styled(Container)`
  padding: 0 30px 15px 30px;
`;

const ProductsPage = ({
  CheckoutModal,
  ShowCheckoutFormButton,
  productTypeDef,
  products,
}) => {
  const pageHeading = productTypeDef.productsPage;
  let showPageHeading = false;
  if (
    (pageHeading.title != null && pageHeading.title !== "") ||
    (pageHeading.overview != null && pageHeading.overview !== "")
  ) {
    showPageHeading = true;
  }

  return (
    <ProductContainer fluid >
      <ProductDetailModal ShowCheckoutFormButton={ShowCheckoutFormButton} />
      <CheckoutModal />
      { showPageHeading ?
          (
            <PageHeading
              overview={pageHeading.overview}
              sections={[]}
              title={pageHeading.title}
            />
          ) :
          null
      }
      <Deck>
        {
          products.map((product, idx) => (
            <ProductFeatureCard
              key={product.title}
              {...product}
              ShowCheckoutFormButton={ShowCheckoutFormButton}
              id={idx}
            />
          ))
        }
      </Deck>
    </ProductContainer>
  );
};

ProductsPage.propTypes = {
  CheckoutModal: PropTypes.func.isRequired,
  ShowCheckoutFormButton: PropTypes.func.isRequired,
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
    retrieval: selectors.retrieval,
  })),

  branch(
    ({ retrieval }) => !retrieval.initiated || retrieval.pending,
    renderComponent(() => <DelaySpinner size="large" />),
  ),
);

export default enhance(ProductsPage);

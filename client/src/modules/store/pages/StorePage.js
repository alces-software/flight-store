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
import { Container, Col } from 'reactstrap';
import { DelaySpinner, PageHeading } from 'flight-reactware';
import { branch, compose, renderComponent } from 'recompose';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import EqualHeightRow from '../../../components/EqualHeightRow';

import ProductTypeCard from '../components/ProductTypeCard';
import * as selectors from '../selectors';

const ProductContainer = styled(Container)`
  padding: 0 30px 15px 30px;
`;

const StorePage = ({ productTypeDefs }) => {
  return (
    <ProductContainer fluid >
      <PageHeading
        overview=""
        sections={[]}
        title="Choose a product category."
      />
      <EqualHeightRow>
        {
          productTypeDefs.map((productTypeDef, idx) => (
            <Col key={productTypeDef.title}>
              <ProductTypeCard
                {...productTypeDef}
                id={idx}
              />
            </Col>
          ))
        }
      </EqualHeightRow>
    </ProductContainer>
  );
};

StorePage.propTypes = {
  productTypeDefs: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const enhance = compose(
  connect(createStructuredSelector({
    productTypeDefs: selectors.productTypeDefs,
    retrieval: selectors.retrieval,
  })),

  branch(
    ({ retrieval }) => !retrieval.initiated || retrieval.pending,
    renderComponent(() => <DelaySpinner size="large" />),
  ),
);

export default enhance(StorePage);

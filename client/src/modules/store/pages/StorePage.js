/*=============================================================================
 * Copyright (C) 2018 Stephen F. Norledge and Alces Flight Ltd.
 *
 * This file is part of Flight Store.
 *
 * All rights reserved, see LICENSE.txt.
 *===========================================================================*/
import React from 'react';
import styled from 'styled-components';
import { Container, Col } from 'reactstrap';
import { compose } from 'recompose';
import { PageHeading } from 'flight-reactware';

import EqualHeightRow from '../../../components/EqualHeightRow';

import ProductTypeCard from '../components/ProductTypeCard';
import productTypeDefs from '../data/productTypeDefinitions';

const ProductContainer = styled(Container)`
  padding: 0 30px 15px 30px;
`;

const StorePage = () => {
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
};

const enhance = compose(
);

export default enhance(StorePage);

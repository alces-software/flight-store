/*=============================================================================
 * Copyright (C) 2018 Stephen F. Norledge and Alces Flight Ltd.
 *
 * This file is part of Flight Store.
 *
 * All rights reserved, see LICENSE.txt.
 *===========================================================================*/
import React from 'react';
import styled from 'styled-components';
import { Container, Row, Col } from 'reactstrap';
import { compose } from 'recompose';
import { PageHeading } from 'flight-reactware';

import PackFeatureCard from '../components/PackFeatureCard';
import PackDetailModal from '../components/PackDetailModal';
import FormModal from '../components/FormModal';
import clusterPacks from '../data/packs';

const PackContainer = styled(Container)`
  padding: 0 30px 15px 30px;
`;

const StorePage = () => {
  return (
    <PackContainer fluid >
      <PackDetailModal />
      <FormModal />
      <PageHeading
        overview="Ready to get going? Choose a cluster pack, enter your credit
        card details and request your fully managed Alces Flight HPC cluster."
        sections={[]}
        title="Choose a cluster pack."
      />
      <Row>
        {
          clusterPacks.map((pack, idx) => (
            <Col key={pack.title}>
              <PackFeatureCard
                {...pack}
                id={idx}
              />
            </Col>
          ))
        }
      </Row>
    </PackContainer>
  );
};

StorePage.propTypes = {
};

const enhance = compose(
);

export default enhance(StorePage);

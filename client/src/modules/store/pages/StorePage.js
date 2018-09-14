/*=============================================================================
 * Copyright (C) 2018 Stephen F. Norledge and Alces Flight Ltd.
 *
 * This file is part of Flight Store.
 *
 * All rights reserved, see LICENSE.txt.
 *===========================================================================*/
import React from 'react';
// import PropTypes from 'prop-types';
import {
  Container,
  Row,
  Col,
} from 'reactstrap';
import { compose } from 'recompose';
// import { connect } from 'react-redux';
// import { createStructuredSelector } from 'reselect';
import { Section, makeSection } from 'flight-reactware';

import ClusterPack from '../components/ClusterPack';
import PackDetailModal from '../components/PackDetailModal';
import clusterPacks from '../data/packs';

const sections = {
  howDoesThisWork: makeSection('How does this work', 'question', 'pink', 'cog'),
  selectPack: makeSection('Choose a cluster pack', 'server', 'blue', 'desktop'),
};

const StorePage = () => {
  return (
    <Container fluid >
      <PackDetailModal />
      <Section
        overview="Ready to get going? Choose a cluster pack, enter your credit
        card details and request your fully managed Alces Flight HPC cluster."
        section={sections.selectPack}
        title="Choose a cluster pack."
      >
        <Row>
          {
            clusterPacks.map((pack, idx) => (
              <Col key={pack.title}>
                <ClusterPack
                  {...pack}
                  id={idx}
                />
              </Col>
            ))
          }
        </Row>
      </Section>
    </Container>
  );
};

StorePage.propTypes = {
};

const enhance = compose(
  // branch(
  //   ({ launchUser }) => !launchUser,
  //   renderComponent(() => <Redirect to={`/`} />),
  // ),
);

export default enhance(StorePage);

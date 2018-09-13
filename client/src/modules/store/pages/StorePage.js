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
import { Section, Theme, makeSection } from 'flight-reactware';
import styled from 'styled-components';

import ContextLink from '../../../elements/ContextLink';

import ClusterPack from '../components/ClusterPack';

const FlightCenterLink = () => (
  <ContextLink
    linkSite="Center"
    location="/"
  >
    Alces Flight Center
  </ContextLink>
);

const LiTick = styled.li.attrs({
  className: 'fa-li fa fa-check',
})`
  color: ${Theme.orange};
`;

const sections = {
  howDoesThisWork: makeSection('How does this work', 'question', 'pink', 'cog'),
  selectPack: makeSection('Choose a cluster pack', 'server', 'blue', 'desktop'),
};

const StorePage = () => {
  return (
    <Container fluid >
      <Section
        overview="Ready to get going? Choose a cluster pack, enter your credit
        card details and request your fully managed Alces Flight HPC cluster."
        section={sections.selectPack}
        title="Choose a cluster pack."
      >
        <Row>
          <Col>
            <ClusterPack
              monthlyCost={250}
              subtitle="For small-scale workloads."
              title="Standard cluster"
            >
              <ul className="fa-ul">
                <li>
                  <LiTick />
                  Entry-level login node and general-level compute nodes (3.75
                  GiB, 2 CPUs).
                </li>
                <li>
                  <LiTick />
                  Autoscales from two general economy nodes (7.5 GiB, 4 CPUs)
                  down to a single node.
                </li>
                <li>
                  <LiTick />
                  Operates the Slurm Workload Manager job scheduler.
                </li>
                <li>
                  <LiTick />
                  2 <FlightCenterLink /> support credits per month.
                </li>
              </ul>
            </ClusterPack>
          </Col>
          <Col>
            <ClusterPack
              monthlyCost={500}
              subtitle="For workloads that require enhanced processing."
              title="Performance cluster"
            >
              <ul className="fa-ul">
                <li>
                  <LiTick />
                  Medium-sized login node and balanced compute nodes (60 GiB,
                  36 CPUs).
                </li>
                <li>
                  <LiTick />
                  Autoscales from a single compute node to four balanced
                  compute nodes (240GiB, 144 CPUs).
                </li>
                <li>
                  <LiTick />
                  Operates the Open Grid Scheduler (SGE) job Scheduler.
                </li>
                <li>
                  <LiTick />
                  5 <FlightCenterLink /> support credits per month.
                </li>
              </ul>
            </ClusterPack>
          </Col>
          <Col>
            <ClusterPack
              monthlyCost={1000}
              subtitle="For workloads that scale best on GPU architectures."
              title="GPU cluster"
            >
              <ul className="fa-ul">
                <li>
                  <LiTick />
                  Medium-sized login node and GPU compute nodes (488 GiB,
                  32 CPUS, 8 GPUs).
                </li>
                <li>
                  <LiTick />
                  Autoscales from a single GPU node to two GPU nodes (976 GiB,
                  64 CPUs, 16 GPUs).
                </li>
                <li>
                  <LiTick />
                  Operates the Open Grid Scheduler (SGE) job Scheduler.
                </li>
                <li>
                  <LiTick />
                  10 <FlightCenterLink /> support credits per month.
                </li>
              </ul>
            </ClusterPack>
          </Col>
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

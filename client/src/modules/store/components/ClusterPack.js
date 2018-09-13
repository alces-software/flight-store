import FontAwesome from 'react-fontawesome';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import { Button, Card, CardBody, CardSubtitle, CardTitle, } from 'reactstrap';
import { Theme } from 'flight-reactware';

import CostCircle from './CostCircle';
import FeatureList from './PackFeatureList';

const PackCard = styled(Card)`
  border-radius: 1rem;
`;

const packHeadHeight = '140px';

const PackHead = styled(CardBody)`
  background-color: ${Theme.dark};
  border-radius: 1rem 1rem 0 0;
  color: white;
  height: ${packHeadHeight};
  text-align: center;
`;

const PackBody = styled(CardBody)`
  padding-top: 45px;
`;

const LearnMoreLink = () => (
  <Button
    block
    color="link"
  >
    Learn more about this cluster pack.
  </Button>
);

const PurchaseButton = () => (
  <Button
    block
    color="primary"
    outline
    size="lg"
  >
    Purchase{' '}
    <FontAwesome
      fixedWidth
      name="credit-card"
    />
  </Button>
);

const ClusterPack = ({
  features,
  monthlyCost,
  monthlyFlightCenterCredits,
  subtitle,
  title,
}) => (
  <PackCard>
    <PackHead>
      <CardTitle tag="h3">
        {title}
      </CardTitle>
      <CardSubtitle>
        {subtitle}
      </CardSubtitle>
      <CostCircle
        containerHeight={packHeadHeight}
        monthlyCost={monthlyCost}
      />
    </PackHead>
    <PackBody>
      <FeatureList
        features={features}
        monthlyFlightCenterCredits={monthlyFlightCenterCredits}
      />
      <LearnMoreLink />
      <PurchaseButton />
    </PackBody>
  </PackCard>
);

ClusterPack.propTypes = {
  features: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  monthlyCost: PropTypes.node.isRequired,
  monthlyFlightCenterCredits: PropTypes.node.isRequired,
  subtitle: PropTypes.node.isRequired,
  title: PropTypes.node.isRequired,
};

export default ClusterPack;

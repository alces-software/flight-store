import PropTypes from 'prop-types';
import React from 'react';
import { CardTitle, CardSubtitle } from 'reactstrap';

import CostCircle from './CostCircle';
import FeatureList from './PackFeatureList';
import LearnMoreLink from './LearnMoreLink';
import PurchaseButton from './PurchaseButton';
import { PackCard, PackHead, PackBody, packHeadHeight } from './PackCard';

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

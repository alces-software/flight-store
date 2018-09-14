import PropTypes from 'prop-types';
import React from 'react';
import { CardSubtitle, CardText, CardTitle } from 'reactstrap';
import { PackCard, PackHead, PackBody, packHeadHeight } from './PackCard';

import CostCircle from './CostCircle';
import PurchaseButton from './PurchaseButton';

const PackDetailCard = ({
  details,
  head,
  monthlyCost,
  monthlyFlightCenterCredits,
  subtitle,
  title,
}) => (
  <PackCard>
    <PackHead>
      { head == null ? null : head }
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
      <CardText>
        {details}
      </CardText>
      <PurchaseButton />
    </PackBody>
  </PackCard>
);

PackDetailCard.propTypes = {
  details: PropTypes.string.isRequired,
  head: PropTypes.node,
  monthlyCost: PropTypes.node.isRequired,
  monthlyFlightCenterCredits: PropTypes.node.isRequired,
  subtitle: PropTypes.node.isRequired,
  title: PropTypes.node.isRequired,
};

export default PackDetailCard;

import PropTypes from 'prop-types';
import React from 'react';
import { CardSubtitle, CardText, CardTitle } from 'reactstrap';
import { PackCard, PackHead, PackBody, packHeadHeight } from './PackCard';

import RenderMarkdown from '../../../components/RenderMarkdown';

import CostCircle from './CostCircle';
import ShowCheckoutFormButton from './ShowCheckoutFormButton';

const PackDetailCard = ({
  details,
  head,
  id,
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
        <RenderMarkdown value={details} />
      </CardText>
      <ShowCheckoutFormButton id={id} />
    </PackBody>
  </PackCard>
);

PackDetailCard.propTypes = {
  details: PropTypes.string.isRequired,
  head: PropTypes.node,
  id: PropTypes.number.isRequired,
  monthlyCost: PropTypes.node.isRequired,
  monthlyFlightCenterCredits: PropTypes.node.isRequired,
  subtitle: PropTypes.node.isRequired,
  title: PropTypes.node.isRequired,
};

export default PackDetailCard;

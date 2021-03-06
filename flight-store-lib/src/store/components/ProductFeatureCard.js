import PropTypes from 'prop-types';
import React from 'react';
import { CardTitle, CardSubtitle } from 'reactstrap';

import utils from '../../utils';

import Iconography from './Iconography';
import FeatureList from './FeatureList';
import LearnMoreLink from './LearnMoreLink';
import ProductCost from './ProductCost';
import {
  ArrowDown,
  ProductBody,
  ProductCard,
  ProductFooter,
  ProductHead,
} from './ProductCard';

const ProductFeatureCard = ({
  ShowCheckoutFormButton,
  backgroundColor,
  cost,
  details,
  features,
  emphasise,
  iconography,
  id,
  learnMore,
  subtitle,
  title,
  type,
}) => {

  const featureList = features == null || features == "" ?
    null :
    <FeatureList features={features} />;
  const renderedDetails = details == null || details == "" ?
    null :
    <utils.RenderMarkdown value={details} />;
  const learnMoreLink = learnMore == null || learnMore == "" ?
    null :
    (
      <LearnMoreLink
        id={id}
        type={type}
      />
    );

  return (
    <ProductCard
      backgroundColor={backgroundColor}
      emphasise={emphasise}
    >
      <ProductHead backgroundColor={backgroundColor}>
        { iconography == null ? null : <Iconography {...iconography} /> }
        <CardTitle tag="h1">
          {title}
        </CardTitle>
        <CardSubtitle>
          {subtitle}
        </CardSubtitle>
      </ProductHead>
      <ArrowDown
        backgroundColor={backgroundColor}
        size={40}
      />
      <ProductBody className="position-relative">
        <ProductCost cost={cost} />
        {featureList}
        {renderedDetails}
        {learnMoreLink}

      </ProductBody>
      <ProductFooter emphasise={emphasise}>
        <ShowCheckoutFormButton
          id={id}
          type={type}
        />
      </ProductFooter>
    </ProductCard>
  );
};

ProductFeatureCard.propTypes = {
  ShowCheckoutFormButton: PropTypes.oneOfType([
    PropTypes.func.isRequired,
    PropTypes.object.isRequired,
  ]),
  backgroundColor: PropTypes.string,
  cost: PropTypes.shape({
    unit: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired,
    per: PropTypes.string,
  }).isRequired,
  details: PropTypes.string,
  features: PropTypes.array,
  emphasise: PropTypes.bool,
  iconography: PropTypes.shape({
    name: PropTypes.string.isRequired,
    count: PropTypes.number.isRequired,
  }),
  id: PropTypes.number.isRequired,
  learnMore: PropTypes.string,
  subtitle: PropTypes.node.isRequired,
  title: PropTypes.node.isRequired,
  type: PropTypes.string.isRequired,
};

export default ProductFeatureCard;

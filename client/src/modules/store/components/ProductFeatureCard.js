import PropTypes from 'prop-types';
import React from 'react';
import { CardTitle, CardSubtitle } from 'reactstrap';

import CostCircle from './CostCircle';
import FeatureList from './FeatureList';
import LearnMoreLink from './LearnMoreLink';
import ShowCheckoutFormButton from './ShowCheckoutFormButton';
import { ProductCard, ProductHead, ProductBody, productHeadHeight } from './ProductCard';

const ProductFeatureCard = ({
  cost,
  features,
  id,
  subtitle,
  title,
  type,
}) => (
  <ProductCard>
    <ProductHead>
      <CardTitle tag="h3">
        {title}
      </CardTitle>
      <CardSubtitle>
        {subtitle}
      </CardSubtitle>
      <CostCircle
        containerHeight={productHeadHeight}
        cost={cost}
      />
    </ProductHead>
    <ProductBody>
      <FeatureList features={features} />
      <LearnMoreLink
        id={id}
        type={type}
      />
      <ShowCheckoutFormButton
        id={id}
        type={type}
      />
    </ProductBody>
  </ProductCard>
);

ProductFeatureCard.propTypes = {
  cost: PropTypes.shape({
    unit: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired,
    per: PropTypes.string,
  }).isRequired,
  features: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  id: PropTypes.number.isRequired,
  subtitle: PropTypes.node.isRequired,
  title: PropTypes.node.isRequired,
  type: PropTypes.string.isRequired,
};

export default ProductFeatureCard;

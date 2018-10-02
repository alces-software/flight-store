import PropTypes from 'prop-types';
import React from 'react';
import { CardSubtitle, CardText, CardTitle } from 'reactstrap';
import { ProductCard, ProductHead, ProductBody, productHeadHeight } from './ProductCard';

import RenderMarkdown from '../../../components/RenderMarkdown';
import checkout from '../../checkout';

import CostCircle from './CostCircle';

const ProductDetailCard = ({
  details,
  head,
  id,
  cost,
  subtitle,
  title,
  type,
}) => (
  <ProductCard>
    <ProductHead>
      { head == null ? null : head }
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
      <CardText>
        <RenderMarkdown value={details} />
      </CardText>
      <checkout.ShowCheckoutFormButton
        id={id}
        type={type}
      />
    </ProductBody>
  </ProductCard>
);

ProductDetailCard.propTypes = {
  cost: PropTypes.shape({
    unit: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired,
    per: PropTypes.string,
  }).isRequired,
  details: PropTypes.string.isRequired,
  head: PropTypes.node,
  id: PropTypes.number.isRequired,
  subtitle: PropTypes.node.isRequired,
  title: PropTypes.node.isRequired,
  type: PropTypes.string.isRequired,
};

export default ProductDetailCard;

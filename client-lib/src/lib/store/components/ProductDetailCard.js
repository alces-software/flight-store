import PropTypes from 'prop-types';
import React from 'react';
import { CardSubtitle, CardText, CardTitle } from 'reactstrap';
import { ProductCard, ProductHead, ProductBody, productHeadHeight } from './ProductCard';

import utils from '../../utils';

import CostCircle from './CostCircle';

const ProductDetailCard = ({
  ShowCheckoutFormButton,
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
        <utils.RenderMarkdown value={details} />
      </CardText>
      <ShowCheckoutFormButton
        id={id}
        type={type}
      />
    </ProductBody>
  </ProductCard>
);

ProductDetailCard.propTypes = {
  ShowCheckoutFormButton: PropTypes.func.isRequired,
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

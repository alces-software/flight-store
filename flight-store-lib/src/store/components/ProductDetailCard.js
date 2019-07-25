import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import { CardSubtitle, CardText, CardTitle } from 'reactstrap';
import { ProductCard, ProductHead, ProductBody } from './ProductCard';

import utils from '../../utils';

import Iconography from './Iconography';
import ProductCost from './ProductCost';

const Subtitle = styled(CardSubtitle)`
  margin-bottom: 0.5rem;
`;

const ProductDetailCard = ({
  ShowCheckoutFormButton,
  learnMore,
  head,
  iconography,
  id,
  cost,
  subtitle,
  title,
  type,
}) => (
  <ProductCard>
    <ProductHead>
      { head == null ? null : head }
      { iconography == null ? null : <Iconography {...iconography} /> }
      <CardTitle tag="h3">
        {title}
      </CardTitle>
      <Subtitle>
        {subtitle}
      </Subtitle>
    </ProductHead>
    <ProductBody>
      <ProductCost cost={cost} />
      <utils.RenderMarkdown value={learnMore} />
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
  learnMore: PropTypes.string.isRequired,
  head: PropTypes.node,
  iconography: PropTypes.shape({
    name: PropTypes.string.isRequired,
    count: PropTypes.number.isRequired,
  }),
  id: PropTypes.number.isRequired,
  subtitle: PropTypes.node.isRequired,
  title: PropTypes.node.isRequired,
  type: PropTypes.string.isRequired,
};

export default ProductDetailCard;

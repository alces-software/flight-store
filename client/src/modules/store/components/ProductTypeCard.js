import PropTypes from 'prop-types';
import React from 'react';
import { Button, CardSubtitle, CardText, CardTitle } from 'reactstrap';
import { LinkContainer } from 'flight-reactware';

import RenderMarkdown from '../../../components/RenderMarkdown';

import IconCircle from './IconCircle';
import { ProductCard, ProductHead, ProductBody, productHeadHeight } from './ProductCard';

const ProductTypeCard = ({
  description,
  icon,
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
      <IconCircle
        containerHeight={productHeadHeight}
        icon={icon}
      />
    </ProductHead>
    <ProductBody>
      <CardText>
        <RenderMarkdown value={description} />
      </CardText>
      <LinkContainer
        to={`/products/${type}`}
      >
        <Button
          block
          color="primary"
        >
          View products
        </Button>
      </LinkContainer>
    </ProductBody>
  </ProductCard>
);

ProductTypeCard.propTypes = {
  description: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  subtitle: PropTypes.node,
  title: PropTypes.node.isRequired,
  type: PropTypes.string.isRequired,
};

export default ProductTypeCard;

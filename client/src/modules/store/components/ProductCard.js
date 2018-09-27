import styled from 'styled-components';
import { Card, CardBody } from 'reactstrap';
import { Theme } from 'flight-reactware';

import { size as costSize } from './CostCircle';

export const ProductCard = styled(Card)`
  border-radius: 1rem;
`;

export const productHeadHeight = '140px';

export const ProductHead = styled(CardBody)`
  background-color: ${Theme.dark};
  border-radius: 1rem 1rem 0 0;
  color: white;
  height: ${productHeadHeight};
  text-align: center;
`;

export const ProductBody = styled(CardBody)`
  padding-top: calc( ( ${costSize} / 2 ) + 12px );
`;

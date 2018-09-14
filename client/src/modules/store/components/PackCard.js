import styled from 'styled-components';
import { Card, CardBody } from 'reactstrap';
import { Theme } from 'flight-reactware';

import { size as costSize } from './CostCircle';

export const PackCard = styled(Card)`
  border-radius: 1rem;
`;

export const packHeadHeight = '140px';

export const PackHead = styled(CardBody)`
  background-color: ${Theme.dark};
  border-radius: 1rem 1rem 0 0;
  color: white;
  height: ${packHeadHeight};
  text-align: center;
`;

export const PackBody = styled(CardBody)`
  padding-top: calc( ( ${costSize} / 2 ) + 12px );
`;

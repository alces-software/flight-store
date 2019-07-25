import styled, { css } from 'styled-components';
import { Card, CardBody, CardFooter } from 'reactstrap';
import { Theme } from 'flight-reactware';

export const ProductCard = styled(Card)`
  &.card {
    border-radius: 1rem;

    ${(props) => !props.emphasise ? null : css`
      transform: scale(1.25, 1.4);
      z-index: 10;
    `}
  }
`;

export const ProductHead = styled(CardBody)`
  &.card-body {
    background-color: ${Theme.dark};
    border-radius: 1rem 1rem 0 0;
    color: white;
    flex: 0 0 auto;
    text-align: center;
  }
`;

export const ProductBody = styled(CardBody)`
  &.card-body {
  }
`;

export const ProductFooter = styled(CardFooter)`
  &.card-footer {
    background: none;
    border-radius: 0 0 1rem 1rem;
    border-top: none;
  }
`;

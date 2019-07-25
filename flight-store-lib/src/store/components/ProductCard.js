import styled, { css } from 'styled-components';
import { Card, CardBody, CardFooter } from 'reactstrap';
import { Theme } from 'flight-reactware';
import { lighten } from 'polished';

export const ProductCard = styled(Card)`
  &.card {
    border-radius: 1rem;

    ${(props) => !props.emphasise ? null : css`
      transform: scale(1.25, 1.4);
      z-index: 10;
    `}

    background-color: ${(props) => props.backgroundColor == null ?
      null :
      lighten(0.4, props.backgroundColor)
    };

    border-color: ${
      (props) => props.backgroundColor == null ? null : props.backgroundColor
    };
  }
`;

export const ProductHead = styled(CardBody)`
  &.card-body {
    background-color: ${(props) => props.backgroundColor || Theme.dark};
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

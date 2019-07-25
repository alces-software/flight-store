import styled, { css } from 'styled-components';
import { Card, CardBody, CardFooter } from 'reactstrap';
import { Styles, Theme } from 'flight-reactware';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { lighten } from 'polished';

import constants from '../../constants';

const enhance = compose(
  connect(
    createStructuredSelector({
      emphasisBreakPoint: (state) => constants.selectors.get(
        state, { name: 'EMPHASIS_BREAK_POINT' }
      ),
    })
  ),

  Styles.withStyles`
    &.card {
      border-radius: 1rem;

      background-color: ${(props) => props.backgroundColor == null ?
        null :
        lighten(0.4, props.backgroundColor)
      };

      border-color: ${
        (props) => props.backgroundColor == null ? null : props.backgroundColor
      };

      ${(props) => !props.emphasise ? null : css`
        @media (min-width: ${props.emphasisBreakPoint || '1200px'}) {
          transform: scale(1.25, 1.4);
          z-index: 10;
        `}
      }
    }
  `,
);

const ProductCard = enhance(Card);
export { ProductCard };

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

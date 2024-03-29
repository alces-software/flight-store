import styled, { css } from 'styled-components';
import { Card, CardBody, CardFooter } from 'reactstrap';
import { Styles, Theme } from 'flight-reactware';
import { compose, mapProps } from 'recompose';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { lighten } from 'polished';
import { omit } from 'lodash';

import constants from '../../constants';

function omitProps(keys) {
  return mapProps(props => omit(props, keys));
}

const enhanceCard = compose(
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
          transform: scale(1.27, 1.27) translateY(-7px);
          z-index: 10;
        `}
      }
    }
  `,

  // Stop React from complaining about these props.  They've done their job
  // already.
  omitProps(['backgroundColor', 'dispatch', 'emphasise', 'emphasisBreakPoint']),
);

const ProductCard = enhanceCard(Card);
export { ProductCard };

const enhanceHeader = compose(
  Styles.withStyles`
    &.card-body {
      background-color: ${(props) => props.backgroundColor || Theme.dark};
      border-radius: 1rem 1rem 0 0;
      color: white;
      flex: 0 0 auto;
      text-align: center;
    }
  `,

  // Stop React from complaining about these props.  They've done their job
  // already.
  omitProps(['backgroundColor']),
);
const ProductHead = enhanceHeader(CardBody);
export { ProductHead };

export const ProductBody = styled(CardBody)`
  &.card-body {
    margin-top: -10px;
  }
`;

const enhanceFooter = compose(
  connect(
    createStructuredSelector({
      emphasisBreakPoint: (state) => constants.selectors.get(
        state, { name: 'EMPHASIS_BREAK_POINT' }
      ),
    })
  ),

  Styles.withStyles`
    &.card-footer {
      background: none;
      border-radius: 0 0 1rem 1rem;
      border-top: none;

      ${(props) => !props.emphasise ? null : css`
        @media (min-width: ${props.emphasisBreakPoint || '1200px'}) {
          transform: scale(0.78, 0.78);
          z-index: 10;
        `}
      }
    }
  `,

  // Stop React from complaining about these props.  They've done their job
  // already.
  omitProps(['dispatch', 'emphasise', 'emphasisBreakPoint']),
);

const ProductFooter = enhanceFooter(CardFooter);
export { ProductFooter };

// We multiply `props.size` by 0.866 for the top border width to get an
// equilateral triangle.
// `position: relative` and `top: -1px` prevents a possible 1px uncoloured
// line above the triangle for the emphasised card.
const ArrowDown = styled.div`
  position: relative;
  top: -1px;
  width: 0; 
  height: 0; 
  margin: auto;
  border-left: ${(props) => props.size}px solid transparent;
  border-right: ${(props) => props.size}px solid transparent;
  
  border-top-width: ${(props) => props.size * 0.866}px;
  border-top-style: solid;
  border-top-color: ${(props) => props.backgroundColor == null ?
    null :
    props.backgroundColor
  };
`;
export { ArrowDown };

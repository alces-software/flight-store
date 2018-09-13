import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import { Theme } from 'flight-reactware';

const costSize = '90px';
const padding = '6px';
const fontSize = '17px';

const CostInner = styled.div`
  background-color: ${Theme.orange};
  border-radius: 50%;
  box-shadow: 0 0 10px rgba(0,0,0,0.5);
  color: white;
  font-size: ${fontSize};
  font-weight: 700;
  height: ${costSize};
  line-height: calc( ${costSize} - ( ${padding} * 2 ) - ( ${fontSize} / 2 ) );
  margin: 0 auto;
  padding: ${padding} 0;
  position: relative;
  white-space: initial;
  width: ${costSize};
  word-wrap: break-word;
`;

const CostWrapper = styled.div`
  position: absolute;
  top: calc( ${(props) => props.containerHeight} - ( ${costSize} / 2 ) );
  left: 0;
  width: 100%;
`;

const CostCircle = ({ containerHeight, monthlyCost }) => (
  <CostWrapper containerHeight={containerHeight}>
    <CostInner>
      <span>
        <small>£</small><big>{monthlyCost}</big><small>/mo</small>
      </span>
    </CostInner>
  </CostWrapper>
);

CostCircle.propTypes = {
  containerHeight: PropTypes.string.isRequired,
  monthlyCost: PropTypes.node.isRequired,
};

export default CostCircle;

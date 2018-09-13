import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import { Theme } from 'flight-reactware';

const costSize = '90px';

const CostInner = styled.div`
  background-color: ${Theme.orange};
  border-radius: 50%;
  box-shadow: 0 0 10px rgba(0,0,0,0.5);
  color: white;
  font-size: 110%;
  font-weight: 700;
  height: ${costSize};
  margin: 0 auto;
  padding: 6px 12px;
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
        <small>£</small><big>{monthlyCost}</big> <small>/mo</small>
      </span>
    </CostInner>
  </CostWrapper>
);

CostCircle.propTypes = {
  containerHeight: PropTypes.string.isRequired,
  monthlyCost: PropTypes.node.isRequired,
};

export default CostCircle;

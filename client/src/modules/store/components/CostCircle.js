import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import { Theme } from 'flight-reactware';

export const size = '90px';
const padding = '6px';
const fontSize = '17px';

const CostInner = styled.div`
  background-color: ${Theme.orange};
  border-radius: 50%;
  box-shadow: 0 0 10px rgba(0,0,0,0.5);
  color: white;
  font-size: ${fontSize};
  font-weight: 700;
  height: ${size};
  line-height: calc( ${size} - ( ${padding} * 2 ) - ( ${fontSize} / 2 ) );
  margin: 0 auto;
  padding: ${padding} 0;
  position: relative;
  white-space: initial;
  width: ${size};
  word-wrap: break-word;
`;

const CostWrapper = styled.div`
  position: absolute;
  top: calc( ${(props) => props.containerHeight} - ( ${size} / 2 ) );
  left: 0;
  width: 100%;
`;

const CostCircle = ({ containerHeight, cost }) => {
  const per = cost.per ? <small>{cost.per}</small> : null;

  return (
    <CostWrapper containerHeight={containerHeight}>
      <CostInner>
        <span>
          <span>
            <small>{cost.unit}</small><big>{cost.amount}</big>{per}
          </span>
        </span>
      </CostInner>
    </CostWrapper>
  );
};

CostCircle.propTypes = {
  containerHeight: PropTypes.string.isRequired,
  cost: PropTypes.shape({
    unit: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired,
    per: PropTypes.string,
  }).isRequired,
};

export default CostCircle;

import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import { Theme } from 'flight-reactware';

export const size = '90px';
export const padding = '6px';
export const fontSize = '17px';

const CircleInner = styled.div`
  background-color: ${Theme.orange};
  border-radius: 50%;
  box-shadow: 0 0 10px rgba(0,0,0,0.5);
  color: white;
  display: flex;
  flex-direction: column;
  font-size: ${fontSize};
  font-weight: 700;
  height: ${size};
  justify-content: center;
  margin: 0 auto;
  padding: ${padding} 0;
  position: relative;
  white-space: initial;
  width: ${size};
  word-wrap: break-word;
`;

const CircleWrapper = styled.div`
  position: absolute;
  top: calc( ${(props) => props.containerHeight} - ( ${size} / 2 ) );
  left: 0;
  width: 100%;
`;

const CardHeaderCircle = ({ containerHeight, children }) => (
  <CircleWrapper containerHeight={containerHeight}>
    <CircleInner>
      {children}
    </CircleInner>
  </CircleWrapper>
);

CardHeaderCircle.propTypes = {
  children: PropTypes.node.isRequired,
  containerHeight: PropTypes.string.isRequired,
};

export default CardHeaderCircle;

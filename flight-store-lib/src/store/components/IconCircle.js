import PropTypes from 'prop-types';
import React from 'react';
import FontAwesome from 'react-fontawesome';

import CardHeaderCircle from './CardHeaderCircle';

const iconSize = '3x';

const IconCircle = ({ containerHeight, icon }) => (
  <CardHeaderCircle containerHeight={containerHeight} >
    <FontAwesome
      name={icon}
      size={iconSize}
    />
  </CardHeaderCircle>
);

IconCircle.propTypes = {
  containerHeight: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
};

export default IconCircle;

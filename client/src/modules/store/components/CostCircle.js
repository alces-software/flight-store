import PropTypes from 'prop-types';
import React from 'react';

import CardHeaderCircle, { size, padding, fontSize } from './CardHeaderCircle';

const CostCircle = ({ containerHeight, cost }) => {
  const per = cost.per ? <small>{cost.per}</small> : null;
  const lineHeight = `calc( ${size} - ( ${padding} * 2 ) - ( ${fontSize} / 2 ) )`;

  return (
    <CardHeaderCircle
      containerHeight={containerHeight}
      lineHeight={lineHeight}
    >
      <span>
        <small>{cost.unit}</small><big>{cost.amount}</big>{per}
      </span>
    </CardHeaderCircle>
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

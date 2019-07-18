import PropTypes from 'prop-types';
import React from 'react';

import CardHeaderCircle, { size, padding, fontSize } from './CardHeaderCircle';

const CostCircle = ({ containerHeight, cost }) => {
  const per = cost.per ? <small>{cost.per}</small> : null;

  return (
    <CardHeaderCircle containerHeight={containerHeight} >
      <div>
        <small>{cost.unit}</small><big>{cost.amount}</big>{per}
      </div>
      <small>
        ({ cost.includesVAT ? 'inc' : 'excl' } VAT)
      </small>
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

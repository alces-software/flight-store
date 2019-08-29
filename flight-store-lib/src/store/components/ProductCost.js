import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

const Spacer = styled.span`
  display: inline-block;
  width: 2px;
`;

const Amount = styled.span`
  font-size: 150%;
`;

const ProductCost = ({ cost }) => {
  const per = cost.per ? <small>{cost.per}</small> : null;

  return (
    <div>
      <div className="d-flex align-items-baseline justify-content-center">
        <div>
          <small>{cost.unit}</small><Amount>{cost.amount}</Amount>{per}
        </div>
        <Spacer/>
        <small>
          ({ cost.includesVAT ? 'inc' : 'excl' } VAT)
        </small>
      </div>
      <div className="d-flex align-items-baseline justify-content-center">
        {
          cost.saving ? (
            <small>
              save {cost.unit}{cost.saving}
            </small>
          ) : null
        }
      </div>
    </div>
  );
};

ProductCost.propTypes = {
  cost: PropTypes.shape({
    unit: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired,
    per: PropTypes.string,
  }).isRequired,
};

export default styled(ProductCost)`
`;

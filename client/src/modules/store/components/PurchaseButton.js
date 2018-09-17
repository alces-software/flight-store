import FontAwesome from 'react-fontawesome';
import PropTypes from 'prop-types';
import React from 'react';
import { Button } from 'reactstrap';
import { connect } from 'react-redux';

import * as actions from '../actions';

const PurchaseButton = ({ showPurchaseForm }) => (
  <Button
    block
    color="primary"
    onClick={showPurchaseForm}
    outline
    size="lg"
  >
    Purchase{' '}
    <FontAwesome
      fixedWidth
      name="credit-card"
    />
  </Button>
);

PurchaseButton.propTypes = {
  showPurchaseForm: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch, props) => ({
  showPurchaseForm: () => dispatch(actions.formModal.show(props.id)),
});

export default connect(null, mapDispatchToProps)(PurchaseButton);

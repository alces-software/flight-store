import FontAwesome from 'react-fontawesome';
import PropTypes from 'prop-types';
import React from 'react';
import { Button } from 'reactstrap';
import { connect } from 'react-redux';

import * as actions from '../actions';

const ShowCheckoutFormButton = ({ showCheckoutForm }) => (
  <Button
    block
    color="primary"
    onClick={showCheckoutForm}
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

ShowCheckoutFormButton.propTypes = {
  showCheckoutForm: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch, props) => ({
  showCheckoutForm: () => dispatch(actions.formModal.show(props.id, props.type)),
});

export default connect(null, mapDispatchToProps)(ShowCheckoutFormButton);

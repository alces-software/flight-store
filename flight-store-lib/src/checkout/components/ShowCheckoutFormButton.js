import FontAwesome from 'react-fontawesome';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import { Button } from 'reactstrap';
import { connect } from 'react-redux';

import * as actions from '../actions';

const StyledButton = styled(Button)`
  background-color: white;
  &:hover {
    background-color: ${({ color }) => `var(--${color})`};
  }
`;

const ShowCheckoutFormButton = ({ showCheckoutForm }) => (
  <StyledButton
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
  </StyledButton>
);

ShowCheckoutFormButton.propTypes = {
  showCheckoutForm: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch, props) => ({
  showCheckoutForm: () => dispatch(actions.modal.show(props.id, props.type)),
});

export default connect(null, mapDispatchToProps)(ShowCheckoutFormButton);

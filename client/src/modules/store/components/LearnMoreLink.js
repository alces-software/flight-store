import PropTypes from 'prop-types';
import React from 'react';
import { Button } from 'reactstrap';
import { connect } from 'react-redux';

import * as actions from '../actions';

const LearnMoreLink = ({ showDetails }) => (
  <Button
    block
    color="link"
    onClick={showDetails}
  >
    Learn more about this cluster pack.
  </Button>
);

LearnMoreLink.propTypes = {
  showDetails: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch, props) => ({
  showDetails: () => dispatch(actions.detailModal.show(props.id)),
});

export default connect(null, mapDispatchToProps)(LearnMoreLink);

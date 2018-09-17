import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { ReduxFormSubmitButton as SubmitButton, StandardModal } from 'flight-reactware';

import * as selectors from '../selectors';
import * as actions from '../actions';

const FormModal = ({
  closeModal,
  clusterPack,
  isOpen,
}) => (
  <StandardModal
    buttons={(
      <SubmitButton
        color="success"
        form="purchase"
      >
        Purchase
      </SubmitButton>
    )}
    isOpen={isOpen}
    size="lg"
    title={`Purchase pack ${clusterPack == null ? null : clusterPack.title}`}
    toggle={closeModal}
  >
    XXX Add form for {clusterPack == null ? null : clusterPack.title}
  </StandardModal>
);

FormModal.propTypes = {
  closeModal: PropTypes.func,
  clusterPack: PropTypes.object,
  isOpen: PropTypes.bool.isRequired,
};

const enhance = compose(
  connect(
    createStructuredSelector({
      clusterPack: selectors.formModal.clusterPack,
      isOpen: selectors.formModal.isModalOpen,
    }),
    {
      closeModal: actions.formModal.hide,
    }
  ),
);

export default enhance(FormModal);


import PropTypes from 'prop-types';
import React from 'react';
import { Elements } from 'react-stripe-elements';
import { StandardModal } from 'flight-reactware';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import * as actions from '../actions';
import * as selectors from '../selectors';
import Form from './CheckoutForm';
import PurchaseButton from './PurchaseButton';

const CheckoutModal = ({
  closeModal,
  clusterPack,
  isOpen,
}) => (
  <StandardModal
    buttons={(
      <PurchaseButton
        onClick={(...args) => {
          const form = this.formWrapper
            .getWrappedInstance()
            .getWrappedInstance();
          form.handleSubmit(...args);
        }}
      />
    )}
    isOpen={isOpen}
    size="lg"
    title={`Purchase pack ${clusterPack == null ? null : clusterPack.title}`}
    toggle={closeModal}
  >
    <Elements>
      <Form
        clusterPack={clusterPack}
        ref={(el) => { this.formWrapper = el; }}
      />
    </Elements>
  </StandardModal>
);

CheckoutModal.propTypes = {
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

export default enhance(CheckoutModal);

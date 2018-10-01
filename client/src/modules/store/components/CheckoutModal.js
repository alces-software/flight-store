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

const SuccessMessage = ({ product }) => (
  <div>
    Your purchase of <em>{product.title} &mdash; {product.subtitle}</em> has
    been successful.
  </div>
);
SuccessMessage.propTypes = {
  product: PropTypes.shape({
    title: PropTypes.node.isRequired,
  }).isOpenn
};

const CheckoutModal = ({
  closeModal,
  isOpen,
  product,
  submitSucceeded,
}) => (
  <StandardModal
    buttons={
      submitSucceeded ? null : (
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
    title={`Purchase ${product == null ? null : product.title}`}
    toggle={closeModal}
  >
    {
      submitSucceeded ? <SuccessMessage product={product} /> : (
        <Elements>
          <Form
            product={product}
            ref={(el) => { this.formWrapper = el; }}
          />
        </Elements>
      )
    }
  </StandardModal>
);

CheckoutModal.propTypes = {
  closeModal: PropTypes.func,
  isOpen: PropTypes.bool.isRequired,
  product: PropTypes.object,
  submitSucceeded: PropTypes.bool,
};

const enhance = compose(
  connect(
    createStructuredSelector({
      product: selectors.formModal.product,
      isOpen: selectors.formModal.isModalOpen,
      submitSucceeded: selectors.submitSucceeded,
    }),
    {
      closeModal: actions.formModal.hide,
    }
  ),
);

export default enhance(CheckoutModal);

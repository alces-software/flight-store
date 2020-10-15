import PropTypes from 'prop-types';
import React from 'react';
import { Elements } from 'react-stripe-elements';
import { auth, StandardModal } from 'flight-reactware';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import constants from '../../constants';

import * as actions from '../actions';
import * as selectors from '../selectors';
import Form from './CheckoutForm';
import PurchaseButton from './PurchaseButton';
import MustLoginMessage from './MustLoginMessage';

const SuccessMessage = ({ product }) => (
  <div>
    Your purchase of <em>{product.name}</em> has been successful.
  </div>
);
SuccessMessage.propTypes = {
  product: PropTypes.shape({
    title: PropTypes.node.isRequired,
  }).isOpenn
};

const Content = ({
  product,
  showLoginForm,
  ssoUser,
  ssoUserRequired,
  submitSucceeded,
}) => {
  if (ssoUserRequired && ssoUser == null) {
    return <MustLoginMessage showLoginForm={showLoginForm} />;
  } else if (submitSucceeded) {
    return <SuccessMessage product={product} /> ;
  } else {
    return (
      <Elements>
        <Form product={product} />
      </Elements>
    );
  }
};
Content.propTypes = {
  product: PropTypes.object,
  ssoUser: PropTypes.object,
  ssoUserRequired: PropTypes.bool,
  submitSucceeded: PropTypes.bool,
};

const CheckoutModal = ({
  closeModal,
  isOpen,
  product,
  showLoginForm,
  ssoUser,
  ssoUserRequired,
  submitSucceeded,
}) => {
  const hidePurchaseButton = submitSucceeded || (ssoUserRequired && ssoUser == null);
  return (
    <StandardModal
      buttons={hidePurchaseButton ? null : <PurchaseButton />}
      isOpen={isOpen}
      size="lg"
      title={`Purchase ${product == null ? null : product.name}`}
      toggle={closeModal}
    >
      <Content
        product={product}
        showLoginForm={showLoginForm}
        ssoUser={ssoUser}
        ssoUserRequired={ssoUserRequired}
        submitSucceeded={submitSucceeded}
      />
    </StandardModal>
  );
};

CheckoutModal.propTypes = {
  closeModal: PropTypes.func,
  isOpen: PropTypes.bool.isRequired,
  product: PropTypes.object,
  ssoUser: PropTypes.object,
  ssoUserRequired: PropTypes.bool,
  submitSucceeded: PropTypes.bool,
};

const enhance = compose(
  connect(
    createStructuredSelector({
      isOpen: selectors.modal.isModalOpen,
      product: selectors.modal.product,
      ssoUser: auth.selectors.currentUserSelector,
      ssoUserRequired: (state) => constants.selectors.get(state, { name: 'SSO_USER_REQUIRED' }),
      submitSucceeded: selectors.submitSucceeded,
    }),
    {
      closeModal: actions.modal.hide,
    }
  ),
);

export default enhance(CheckoutModal);

import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import { Button, Modal as BaseModal } from 'reactstrap';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import * as actions from '../actions';
import * as selectors from '../selectors';
import ProductDetailCard from './ProductDetailCard';

const Modal = styled(BaseModal)`
  .modal-content {
    border-radius: 1rem;
    .card {
      border: none;
    }
  }
`;

const CloseButton = styled(Button).attrs({
  className: 'close',
})`
  &.close {
    border-top-right-radius: 1rem;
    color: white;
    margin: -1.25rem -1.25rem -1.25rem -1.75rem;
    padding: 1rem;

    :hover {
      background-color: inherit;
      border-color: inherit;
    }
  }
`;

const ProductDetailModal = ({
  closeModal,
  id,
  isOpen,
  product,
  type,
}) => (
  <Modal
    isOpen={isOpen}
    size="lg"
    toggle={closeModal}
  >
    {
      product == null ? null : (
        <ProductDetailCard
          {...product}
          head={
            <CloseButton onClick={closeModal} >
              {String.fromCharCode(215)}
            </CloseButton>
          }
          id={id}
          type={type}
        />
      )
    }
  </Modal>
);

ProductDetailModal.propTypes = {
  closeModal: PropTypes.func,
  id: PropTypes.number,
  isOpen: PropTypes.bool.isRequired,
  product: PropTypes.object,
  type: PropTypes.string,
};

export default connect(
  createStructuredSelector({
    id: selectors.detailModal.productId,
    isOpen: selectors.detailModal.isModalOpen,
    product: selectors.detailModal.product,
    type: selectors.detailModal.productType,
  }),
  {
    closeModal: actions.detailModal.hide,
  }
)(ProductDetailModal);

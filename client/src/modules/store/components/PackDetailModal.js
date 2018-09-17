import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import { Button, Modal as BaseModal } from 'reactstrap';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import * as actions from '../actions';
import * as selectors from '../selectors';
import PackDetailCard from './PackDetailCard';

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

const PackDetailModal = ({
  closeModal,
  clusterPack,
  id,
  isOpen,
}) => (
  <Modal
    isOpen={isOpen}
    size="lg"
    toggle={closeModal}
  >
    {
      clusterPack == null ? null : (
        <PackDetailCard
          {...clusterPack}
          head={
            <CloseButton onClick={closeModal} >
              {String.fromCharCode(215)}
            </CloseButton>
          }
          id={id}
        />
      )
    }
  </Modal>
);

PackDetailModal.propTypes = {
  closeModal: PropTypes.func,
  clusterPack: PropTypes.object,
  id: PropTypes.number,
  isOpen: PropTypes.bool.isRequired,
};

export default connect(
  createStructuredSelector({
    clusterPack: selectors.detailModal.clusterPack,
    id: selectors.detailModal.clusterPackId,
    isOpen: selectors.detailModal.isModalOpen,
  }),
  {
    closeModal: actions.detailModal.hide,
  }
)(PackDetailModal);

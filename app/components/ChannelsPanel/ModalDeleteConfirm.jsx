import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import PropTypes from 'prop-types';
import isRequestSuccess from './modalHelpers';

class ModalDeleteConfirm extends React.Component {
  static propTypes = {
    channelToRemove: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      removable: PropTypes.bool.isRequired,
    }).isRequired,
    onConfirmHandler: PropTypes.func.isRequired,
    onCloseHandler: PropTypes.func.isRequired,
    requestState: PropTypes.oneOf(['none', 'requested', 'failure', 'success']).isRequired,
  }

  componentDidUpdate(prevProps) {
    if (isRequestSuccess(prevProps.requestState, this.props.requestState)) {
      this.props.onCloseHandler();
    }
  }

  render() {
    const {
      channelToRemove,
      onConfirmHandler,
      onCloseHandler,
      requestState,
    } = this.props;
    const reqInPropgress = requestState === 'requested';
    const bodyMessage = reqInPropgress ?
      <ModalBody>Deleting channel <span className="font-weight-bold">{channelToRemove.name}</span>. Please wait.</ModalBody> :
      <ModalBody>Are you sure to delete channel <span className="font-weight-bold">{channelToRemove.name}</span>?</ModalBody>;

    return (
      <Modal isOpen backdrop="static">
        <ModalHeader>Operation warning!</ModalHeader>
        {bodyMessage}
        <ModalFooter>
          <Button color="danger" onClick={onConfirmHandler} disabled={reqInPropgress}>Delete</Button>
          <Button color="secondary" onClick={onCloseHandler} disabled={reqInPropgress}>Cancel</Button>
        </ModalFooter>
      </Modal>
    );
  }
}

export default ModalDeleteConfirm;

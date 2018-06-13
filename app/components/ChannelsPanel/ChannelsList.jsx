import React from 'react';
import { ListGroup, ListGroupItem, Button, ButtonGroup } from 'reactstrap';
import PropTypes from 'prop-types';

class ChannelsList extends React.Component {
  static propTypes = {
    channelsList: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      removable: PropTypes.bool.isRequired,
    })).isRequired,
    currentChannelId: PropTypes.number.isRequired,
    handleOnChannelClick: PropTypes.func.isRequired,
    onRemoveClickHandler: PropTypes.func.isRequired,
    onRenameClickHandler: PropTypes.func.isRequired,
  }

  renderChannelEditButtons(channel) {
    if (!channel.removable) {
      return null;
    }
    const { onRemoveClickHandler, onRenameClickHandler } = this.props;

    return (
      <ButtonGroup size="sm" >
        <Button color="primary" onClick={onRenameClickHandler(channel)}>ren</Button>
        <Button color="danger" onClick={onRemoveClickHandler(channel)}>del</Button>
      </ButtonGroup>
    );
  }

  renderChannelsList() {
    return this.props.channelsList.map((channel) => {
      const isCurrentChannel = this.props.currentChannelId === channel.id;
      const itemProps = {
        action: true,
        active: isCurrentChannel,
        onClick: this.props.handleOnChannelClick(channel.id),
      };
      return (
        <ListGroupItem key={channel.id} {...itemProps} className="text-body d-flex justify-content-between align-items-center">
          <span className="text-truncate">
            {channel.name}
          </span>
          { this.renderChannelEditButtons(channel) }
        </ListGroupItem>);
    });
  }

  render() {
    return (
      <div>
        <ListGroup>
          {this.renderChannelsList()}
        </ListGroup>
      </div>
    );
  }
}

export default ChannelsList;

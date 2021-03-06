import React from 'react';
import PropTypes from 'prop-types';
import ChatHeader from './ChatHeader';
import ChatWindow from './ChatWindow';
import NewMessageForm from './NewMessageForm';
import { getCurrentChannelMessagesSelector, getCurrentChannelNameSelector } from '../../selectors';
import connect from '../../connect';
import { messagesType, requestStateType } from '../../types';

const mapStateToProps = (state) => {
  const props = {
    currentChannelId: state.channels.currentChannelId,
    messages: getCurrentChannelMessagesSelector(state),
    currentChannelName: getCurrentChannelNameSelector(state),
    userName: state.user.name,
    sendMessageState: state.sendMessageState,
  };
  return props;
};

@connect(mapStateToProps)
class ChatPanelContainer extends React.Component {
  static propTypes = {
    currentChannelId: PropTypes.number.isRequired,
    messages: messagesType.isRequired,
    currentChannelName: PropTypes.string.isRequired,
    userName: PropTypes.string.isRequired,
    sendMessageState: requestStateType.isRequired,
    sendMessageRequest: PropTypes.func.isRequired,
  }

  sendMessage = (messageText) => {
    this.props.sendMessageRequest(messageText, this.props.currentChannelId, this.props.userName);
  }

  render() {
    const { userName, currentChannelName, messages } = this.props;

    const chatHeaderProps = {
      userName,
      currentChannelName,
    };

    const chatWindowsProps = {
      messages,
    };

    const newMessageFormProps = {
      onSubmit: this.sendMessage,
      sendMessageState: this.props.sendMessageState,
    };

    return (
      <div className="d-flex flex-column vh-100 justify-content-between">
        <div>
          <ChatHeader {...chatHeaderProps} />
        </div>
        <div className="scrollable mb-2">
          <ChatWindow {...chatWindowsProps} />
        </div>
        <div className="mb-2 mt-auto">
          <NewMessageForm {...newMessageFormProps} />
        </div>
      </div>);
  }
}

export default ChatPanelContainer;

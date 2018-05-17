import React from 'react';
import ChannelsListContainer from '../containers/ChannelsList';
import UserPanelContainer from '../containers/UserPanel';
import ChatWindowContainer from '../containers/ChatWindow';
import NewMessageForm from '../containers/NewMessageForm';

const App = () => (
  <div className="container-fluid">
    <div className="row d-flex vh-100">
      <div className="col-2 d-flex flex-column bg-dark text-white-50">
        <div className="row">
          <UserPanelContainer />
        </div>
        <div className="row scrollable">
          <ChannelsListContainer />
        </div>
      </div>
      <div className="d-flex col flex-column justify-content-between">
        <div className="scrollable">
          <ChatWindowContainer />
        </div>
        <div>
          <NewMessageForm />
        </div>
      </div>
    </div>
  </div>
);

export default App;

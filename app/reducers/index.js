import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import { reducer as formReducer } from 'redux-form';
import * as actions from '../actions';

const user = handleActions({}, {});

const UI = handleActions({
  [actions.toggleEditChannelsUiState](state) {
    return { editChannels: !state.editChannels };
  },
}, {
  editChannels: false,
});

const channels = handleActions({
  [actions.changeCurrentChannel](state, { payload: { id } }) {
    return { ...state, currentChannelId: id };
  },
  [actions.addChannelSocket](state, { payload: { channel } }) {
    const newChannels = [...state.channelsList, channel];
    return { ...state, channelsList: newChannels };
  },
  [actions.removeChannelSocket](state, { payload: { id } }) {
    const newChannels = state.channelsList.filter(ch => ch.id !== id);
    const newCurrentChannelId = state.currentChannelId === id ?
      state.defaultChannelId :
      state.currentChannelId;
    return { channelsList: newChannels, currentChannelId: newCurrentChannelId };
  },
  [actions.renameChannelSocket](state, { payload: { channel: { id, name: newName } } }) {
    const newChannels = state.channelsList.map((ch) => {
      if (ch.id === id) {
        return { ...ch, name: newName };
      }
      return ch;
    });
    return { ...state, channelsList: newChannels };
  },
}, {});

const addChannelRequest = handleActions({
  [actions.addChannelRequest]() {
    return 'requested';
  },
  [actions.addChannelSuccess]() {
    return 'success';
  },
  [actions.addChannelFailure]() {
    return 'failure';
  },
}, 'none');

const renameChannelState = handleActions({
  [actions.renameChannelRequest](state) {
    return { ...state, channelRenameState: 'requested' };
  },
  [actions.renameChannelSuccess](state) {
    return { ...state, channelRenameState: 'success' };
  },
  [actions.renameChannelFailure](state) {
    return { ...state, channelRenameState: 'failure' };
  },
}, 'none');

const removeChannelState = handleActions({
  [actions.removeChannelRequest](state) {
    return { ...state, channelRemoveState: 'requested' };
  },
  [actions.removeChannelSuccess](state) {
    return { ...state, channelRemoveState: 'success' };
  },
  [actions.removeChannelFailure](state) {
    return { ...state, channelRemoveState: 'failure' };
  },
}, 'none');

const sendMessageState = handleActions({
  [actions.sendMessageRequest](state) {
    return { ...state, messageSendingState: 'requested' };
  },
  [actions.sendMessageSuccess](state) {
    return { ...state, messageSendingState: 'success' };
  },
  [actions.sendMessageFailure](state) {
    return { ...state, messageSendingState: 'failure' };
  },
}, 'none');

const messages = handleActions({
  [actions.addMessageSocket](state, { payload: { message } }) {
    return [...state, message];
  },
  [actions.removeChannelSocket](state, { payload: { id } }) {
    return state.filter(m => m.id !== id);
  },
}, []);

const notification = handleActions({
  [actions.dismissNotification]() {
    const info = null;
    return info;
  },
  [actions.sendMessageSuccess]() {
    const info = null;
    return info;
  },
  [actions.sendMessageFailure](state, { payload: { error } }) {
    return { type: 'warning', headline: error, message: 'Message was not delivered to server' };
  },
  [actions.addChannelFailure](state, { payload: { error } }) {
    return { type: 'warning', headline: error, message: 'Channel was not added, request failed' };
  },
  [actions.addChannelSocket](_, { payload: { channel } }) {
    return { type: 'success', message: `Channel '${channel.name}' added.` };
  },
}, null);

const formReducers = formReducer.plugin({
  ModalEditor: handleActions({
    [actions.addChannelSuccess](state) {
      return {
        ...state,
        values: {
          modalInput: undefined,
        },
        registeredFields: {
          modalInput: undefined,
        },
        fields: {
          modalInput: {
            requestPending: false,
          },
        },
      };
    },
    [actions.addChannelFailure](state) {
      return {
        ...state,
        fields: {
          modalInput: {
            requestPending: false,
          },
        },
      };
    },
    [actions.addChannelRequest](state) {
      return {
        ...state,
        fields: {
          modalInput: {
            requestPending: true,
          },
        },
      };
    },
  }, {}),
});

export default combineReducers({
  UI,
  user,
  messages,
  channels,
  form: formReducers,
  addChannelRequest,
  renameChannelState,
  removeChannelState,
  sendMessageState,
  // requestStates,
  notification,
});


import React from 'react';
import { AlertContainer, Alert } from 'react-bs-notifier';

const AlertNotifier = (props) => {
  const {
    type, headline, message, dismissNotification,
  } = props;
  if (!type) {
    return null;
  }
  return (
    <AlertContainer>
      <Alert type={type} onDismiss={dismissNotification} headline={headline} timeout={5000}>
        Oops! {message}
      </Alert>
    </AlertContainer>);
};

export default AlertNotifier;
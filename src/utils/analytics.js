import firebase from 'react-native-firebase';

const analytics = firebase.analytics();

export const logEvent = (event, params) => {
  analytics.logEvent(event, params);
};

export const setEnabled = (enabled) => {
  analytics.setAnalyticsCollectionEnabled(enabled);
};

export const setCurrentScreen = (screenName, screenClassOverride) => {
  analytics.setCurrentScreen(screenName, screenClassOverride);
};

export const setUserId = (id) => {
  analytics.setUserId(id);
};

export const setUserProperty = (data) => {
  if (data) {
    if (data.first_name) {
      analytics.setUserProperty('first_name', data.first_name);
    }
    if (data.last_name) {
      analytics.setUserProperty('last_name', data.last_name);
    }
    if (data.email) {
      analytics.setUserProperty('email', data.email);
    }
    if (data.mobile) {
      analytics.setUserProperty('mobile', data.mobile);
    }
  }
};

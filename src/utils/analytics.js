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
    if (data.name_family) {
      analytics.setUserProperty('name_family', data.name_family);
    }
    if (data.email) {
      analytics.setUserProperty('email', data.email);
    }
    if (data.mobile) {
      analytics.setUserProperty('mobile', data.mobile);
    }
  }
};

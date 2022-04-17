import {createAssistant, createSmartappDebugger} from '@sberdevices/assistant-client';
import {AssistantAppState} from '@sberdevices/assistant-client/dist/typings';
import debug from 'debug';

export const debugSmartData = debug('smart_data');

const initialize = (getState: () => AssistantAppState, getRecoveryState: () => unknown) => {
  if (process.env.NODE_ENV === 'development') {
    return createSmartappDebugger({
      token: process.env.REACT_APP_API_TOKEN || '',
      initPhrase: 'Запусти восхитительные задачи',
      getState,
      getRecoveryState,
      nativePanel: {
        screenshotMode: false,
        tabIndex: -1,
      },
    });
  }

  return createAssistant({getState, getRecoveryState});
};

const assistant = initialize(() => ({}), () => null);

assistant.on('error', (e) => debugSmartData('on error: ', e));

export default assistant;

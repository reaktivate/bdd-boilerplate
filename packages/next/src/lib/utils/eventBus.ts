import PubSub from 'pubsub-js';

export const ADD_NOTIFICATION = Symbol('ADD_NOTIFICATION');

export const publish = (channel: symbol, data?: any) => {
  PubSub.publish(channel, data || null);
};

export const subscribe = (channel: symbol, subscriber: (data?: any, msg?: symbol) => void) => {
  const realSubscriber = (msg: symbol, data: any) => {
    subscriber(data, msg);
  };
  PubSub.subscribe(channel, realSubscriber);
};

import { ObjectID } from 'mongodb';
export const dbDocuments = [
  {
    _id: new ObjectID('5da9aef00b5e8d41605d12fd'),
    ts: '1530228282',
    sender: 'testy-test-service',
    message: {
      foo: 'bar',
      baz: 'bang',
    },
    'sent-from-ip': '1.2.3.4',
    priority: 2,
  },

  {
    _id: new ObjectID('5da9aef00b5e8d41605d12fe'),
    ts: '1530228282',
    sender: 'testy-test-service',
    message: {
      foo: 'bar',
      baz: 'bang',
    },
    'sent-from-ip': '1.2.3.4',
    priority: 2,
  },
];

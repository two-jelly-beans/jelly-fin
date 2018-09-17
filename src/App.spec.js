import React from 'react';
import App from './App';
import '@firebase/firestore';
import renderer from 'react-test-renderer';

it('renders without crashing', () => {
  const rendered = renderer.create(<App />).toJSON();
  expect(rendered).toBeTruthy();
});

test('smoke test', () => {
  expect(true).toBeTruthy();
});
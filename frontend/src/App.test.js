import React, { act } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

global.IS_REACT_ACT_ENVIRONMENT = true;

test('renders the SkillHive home page', async () => {
  localStorage.clear();
  const container = document.createElement('div');
  document.body.appendChild(container);
  const root = createRoot(container);

  await act(async () => {
    root.render(<App />);
  });

  expect(container.textContent).toContain('SkillHive');
  expect(container.textContent).toContain('Create Account');

  await act(async () => {
    root.unmount();
  });
  document.body.removeChild(container);
});

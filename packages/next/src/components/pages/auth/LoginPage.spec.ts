/**
 * @jest-environment jsdom
 */

import React from 'react';
import { setupGlobalStore } from '../../../stores/GlobalStateProvider';
import { LoginController } from './LoginPage.ctrl';
import { fixtures } from '../../../../test-helpers/fixtures';

describe('Home', () => {
  it('renders a heading', async () => {
    const store = setupGlobalStore();
    store.uiStore.setRoute('/auth/login');
    const local = new LoginController();
    await local.doLogin({ email: fixtures.login, password: 'BAD PASSWORD (' });
    expect(local.error).not.toBeFalsy(); // incorrect email.
    await local.doLogin({ email: fixtures.login, password: fixtures.password });
    expect(local.error).toBeFalsy();
    expect(store.uiStore.route).toEqual('/admin');

    //    expect(heading).toBeInTheDocument()
  });
});

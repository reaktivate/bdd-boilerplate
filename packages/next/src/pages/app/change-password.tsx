import { LocalStoreProvider } from '@wf/next/src/stores/LocalStoreProvider';
import { useState } from 'react';
import ChangePasswordView from '@wf/next/src/components/Screens/ChangePassword/ChangePasswordView';
import { ChangePasswordStore } from '@wf/next/src/components/Screens/ChangePassword/ChangePassword.store';

const Login = (props) => {
  const [localStore] = useState(() => new ChangePasswordStore());

  return (
    <LocalStoreProvider localStore={localStore}>
      <ChangePasswordView />
    </LocalStoreProvider>
  );
};

export default Login;

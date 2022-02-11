import TenantsView from '@wf/next/src/components/Screens/Tenants/TenantsView';
import { TenantsStore } from '@wf/next/src/components/Screens/Tenants/TenantsView.store';
import { LocalStoreProvider } from '@wf/next/src/stores/LocalStoreProvider';
import { useState } from 'react';

const Login = (props) => {
  const [localStore] = useState(() => new TenantsStore());

  return (
    <LocalStoreProvider localStore={localStore}>
      <TenantsView />
    </LocalStoreProvider>
  );
};

export default Login;

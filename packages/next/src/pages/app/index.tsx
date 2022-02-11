import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import { useGlobalStore } from '@wf/next/src/stores/GlobalStateProvider';

const MainInner: React.FunctionComponent<any> = () => {
  const { userStore } = useGlobalStore();
  const { uiStore } = useGlobalStore();

  useEffect(() => {
    uiStore.setRoute('/admin/tenants');
  });

  return <div>:)</div>;
};

export default observer(MainInner);

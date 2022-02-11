import { useEffect } from 'react';
import { useGlobalStore } from '@wf/next/src/stores/GlobalStateProvider';

/*export const getServerSideProps: GetServerSideProps = async (context: any) => {
  context.res.setHeader('Location', `/admin`);
  context.res.statusCode = 302;
  return { props: {} };
};*/

const IndexPage: React.FunctionComponent<any> = () => {
  const { uiStore } = useGlobalStore();
  useEffect(() => {
    uiStore.setRoute('/admin/tenants');
  });
  return <div>....</div>;
};

export default IndexPage;

import React, { useEffect } from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import Router from 'next/router';
import '../assets/scss/admin.scss';
import AuthenticatedLayout from '../elements/layouts/AuthenticatedLayout';
import NormalLayout from '../elements/layouts/NormalLayout';
import NProgress from 'nprogress';
import { getGlobalStore, GlobalStoreProvider } from '@wf/next/src/stores/GlobalStateProvider';
import { ToastWrapper } from '../components/shared/ToastWrapper';
import 'bootstrap/dist/css/bootstrap.min.css';

NProgress.configure({ showSpinner: true });

Router.events.on('routeChangeStart', (url) => {
  NProgress.start();
});
Router.events.on('routeChangeComplete', async () => {
  NProgress.done();
});
Router.events.on('routeChangeError', () => {
  NProgress.done();
});

const NextApp: React.FC<AppProps> = (props) => {
  const { Component, pageProps } = props;

  const currentUrl = typeof window === 'undefined' ? '' : Router.router?.asPath;

  const isLoggedPath = currentUrl?.indexOf('/app') === 0;

  useEffect(() => {
    if (currentUrl) getGlobalStore().uiStore.initRoute(currentUrl);
  }, []);

  const Layout =
    (Component as any).layout ||
    (isLoggedPath ? AuthenticatedLayout : NormalLayout) ||
    (({ children }) => <>{children}</>);

  /*const ComponentSsr =
    typeof window === 'undefined'
      ? () => {
          return null;
        }
      : Component;

   */

  return (
    <React.Fragment>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <title>Reaktivate BDD</title>
      </Head>
      <GlobalStoreProvider hydrationData={pageProps}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
        <ToastWrapper />
      </GlobalStoreProvider>
    </React.Fragment>
  );
};

export default NextApp;

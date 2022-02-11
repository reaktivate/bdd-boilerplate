import React from 'react';
import NormalLayout from '../elements/layouts/NormalLayout';

const NoPage: React.FunctionComponent<any> = () => {
  return (
    <NormalLayout>
      <div className="w-100" style={{ textAlign: 'center' }}>
        <h1 style={{ width: '100%' }}>404: page not found</h1>
        Sorry, really.
      </div>
    </NormalLayout>
  );
};

export default NoPage;

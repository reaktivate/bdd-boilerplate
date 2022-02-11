import React from 'react';
import { useRouter } from 'next/router';

const NormalLayout: React.FunctionComponent<any> = (props) => {
  const router = useRouter();

  return (
    <div className="bg-default">
      <div className="main-content">
        <div className="container mt--8 pb-5 main-content-block">
          <div className="row justify-content-center">
            <div className="col-lg-12">
              <div className="card shadow border-0 d-flex flex-row flex-wrap">{props.children}</div>
            </div>
          </div>
        </div>
      </div>
      {/*<!-- Footer -->*/}
      <footer className="py-5">
        <div className="container">
          <div className="row align-items-center justify-content-xl-between">
            <div className="col-xl-6">
              <div className="copyright text-center text-xl-left text-muted">&copy; 2022 Reactivate</div>
            </div>
            <div className="col-xl-6">
              <ul className="nav nav-footer justify-content-center justify-content-xl-end">
                <li className="nav-item">
                  <a href="/" className="nav-link">
                    Sample link
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default NormalLayout;

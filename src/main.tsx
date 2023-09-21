import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom/client';
import { lazyWithPreload } from 'react-lazy-with-preload';
import { Provider } from 'react-redux';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import store from './Redux/sample';
import './css/index.scss';
import { loadTheme } from './lib/util';
import Home from './screens/home/Home';
import app from '../app';
import icons from './assets/icons/icons';

loadTheme();
const OTP = lazyWithPreload(() => import('./screens/login/OTP'));
const Login = lazy(() => import('./screens/login/Login'));
OTP.preload();

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: (
        <Suspense fallback={<Loading />}>
          <Home />
        </Suspense>
      ),
      errorElement: <Error />,
    },
    {
      path: '/login',
      element: (
        <Suspense fallback={<Loading />}>
          <Login />
        </Suspense>
      ),
      errorElement: <Error />,
    },
    {
      path: '/otp',
      element: (
        <Suspense fallback={<Loading />}>
          <OTP />
        </Suspense>
      ),
      errorElement: <Error />,
    },
  ],
  {
    basename: app.base,
  },
);

function Loading() {
  return (
    <div className='screen flex items-center justify-center'>
      <img src={icons.loading} alt='Loading' className='w-10 dark:invert' />
    </div>
  );
}

function Error() {
  return (
    <div className='screen flex items-center justify-center text-center'>
      <p>
        Some Error Occured <br /> Please Go Back
      </p>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      {/* <React.Suspense fallback={<Loading />}> */}
      <RouterProvider router={router} />
      {/* </React.Suspense> */}
    </Provider>
  </React.StrictMode>,
);

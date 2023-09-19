import React from 'react';
import ReactDOM from 'react-dom/client';
import { lazyWithPreload } from 'react-lazy-with-preload';
import { Provider } from 'react-redux';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import store from './Redux/sample';
import images from './assets/images/images';
import './css/index.scss';
import { loadTheme } from './lib/util';
import Home from './screens/home/Home';
import Login from './screens/login/Login';
import app from '../app';

loadTheme();

// Lazy import OTP
const OTP = lazyWithPreload(() => import('./screens/login/OTP'));
OTP.preload();

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <Home />,
      errorElement: <Error />,
    },
    {
      path: '/login',
      element: <Login />,
      errorElement: <Error />,
    },
    {
      path: '/otp',
      element: <OTP />,
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
      <img src={images.loading} alt='' />
    </div>
  );
}

function Error() {
  return (
    <div className='screen flex items-center justify-center text-center'>
      <p>
        Some Error Occured <br /> Please Reload
      </p>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <React.Suspense fallback={<Loading />}>
        <RouterProvider router={router} />
      </React.Suspense>
    </Provider>
  </React.StrictMode>,
);

import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom/client';
import { lazyWithPreload } from 'react-lazy-with-preload';
import { Provider } from 'react-redux';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import store from './Redux/sample';
import './css/index.scss';
import { loadTheme } from './lib/util';
import Home, { HomeScreen } from './screens/home/Home';
import app from '../app';
import icons from './assets/icons/icons';

loadTheme();
const OTP = lazyWithPreload(() => import('./screens/login/OTP'));
const Profile = lazyWithPreload(() => import('./screens/Profile'));
const Login = lazy(() => import('./screens/login/Login'));
OTP.preload();
Profile.preload();

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
      children: [
        {
          path: '/',
          element: <HomeScreen />,
        },
        {
          path: '/wallet',
          element: (
            <Suspense fallback={<Loading />}>
              <div>Wallet</div>
            </Suspense>
          ),
          errorElement: <Error />,
        },
        {
          path: '/offers',
          element: (
            <Suspense fallback={<Loading />}>
              <div>Offers</div>
            </Suspense>
          ),
          errorElement: <Error />,
        },
        {
          path: '/refer',
          element: (
            <Suspense fallback={<Loading />}>
              <div>Refer</div>
            </Suspense>
          ),
          errorElement: <Error />,
        },
      ],
    },
    {
      path: '/profile',
      element: (
        <Suspense fallback={<Loading />}>
          <Profile />
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
        Some Error Occurred <br /> Please Go Back
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

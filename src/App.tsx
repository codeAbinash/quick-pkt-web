import React from 'react';
import ReactDOM from 'react-dom/client';
import { lazyWithPreload } from 'react-lazy-with-preload';
import { Provider } from 'react-redux';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import store from './Redux/sample';
import images from './assets/images/images';
import './css/index.scss';
import { loadTheme } from './lib/util';
import Home from './screens/Home';

loadTheme();

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <Home />,
    },
  ],
  {
    basename: '/quick-pkt',
  },
);

function Loading() {
  return (
    <div className='screen flex items-center justify-center bg-white dark:bg-bg'>
      <img src={images.loading} alt='' />
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

import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom/client';
import { lazyWithPreload } from 'react-lazy-with-preload';
import { Provider } from 'react-redux';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import app from '../app';
import store from './Redux/store';
import icons from './assets/icons/icons';
import { PopupAlertContextProvider } from './context/PopupAlertContext';
import './css/index.scss';
import { loadThemeLs } from './lib/theme';
import Home, { HomeScreen } from './screens/Home/Home';
import PopupAlert from './components/PopupAlert';

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
  loadThemeLs();
});
loadThemeLs();

const OTP = lazyWithPreload(() => import('./screens/Login/OTP'));
const EditProfile = lazyWithPreload(() => import('./screens/Profile/EditProfile'));
const Profile = lazyWithPreload(() => import('./screens/Profile/Profile'));
const Login = lazy(() => import('./screens/Login/Login'));
const AboutUs = lazy(() => import('./screens/About/AboutUs'));
const ContactUs = lazy(() => import('./screens/About/ContactUs'));
const Privacy = lazy(() => import('./screens/Legal/Privacy'));
const Terms = lazy(() => import('./screens/Legal/Terms'));
const FAQ = lazy(() => import('./screens/Support/FAQ'));
const Report = lazy(() => import('./screens/Support/Report'));
const Help = lazy(() => import('./screens/Support/Help'));
const DarkMode = lazy(() => import('./screens/Theme/DarkMode'));
const SelectMobile = lazy(() => import('./screens/Recharge/Mobile/SelectMobile'));
const SpecialOffer = lazy(() => import('./screens/Home/SpecialOffer'));
const SelectPlan = lazy(() => import('./screens/Recharge/Mobile/SelectPlan'));
const Wallet = lazy(() => import('./screens/Home/Wallet'));

OTP.preload();
EditProfile.preload();
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
      children: [
        {
          path: '/',
          element: <HomeScreen />,
        },
        {
          path: '/wallet',
          element: (
            <Suspense fallback={<Loading />}>
              <Wallet />
            </Suspense>
          ),
        },
        {
          path: '/offers',
          element: (
            <Suspense fallback={<Loading />}>
              <div>Offers</div>
            </Suspense>
          ),
        },
        {
          path: '/refer',
          element: (
            <Suspense fallback={<Loading />}>
              <div>Refer</div>
            </Suspense>
          ),
        },
      ],
    },
    {
      path: '/login',
      element: (
        <Suspense fallback={<Loading />}>
          <Login />
        </Suspense>
      ),
    },
    {
      path: '/otp',
      element: (
        <Suspense fallback={<Loading />}>
          <OTP />
        </Suspense>
      ),
    },
    {
      path: '/profile',
      element: (
        <Suspense fallback={<Loading />}>
          <Profile />
        </Suspense>
      ),
    },
    {
      path: 'profile/edit',
      element: (
        <Suspense fallback={<Loading />}>
          <EditProfile />
        </Suspense>
      ),
    },
    {
      path: '/about_us',
      element: (
        <Suspense fallback={<Loading />}>
          <AboutUs />
        </Suspense>
      ),
    },
    {
      path: '/contact_us',
      element: (
        <Suspense fallback={<Loading />}>
          <ContactUs />
        </Suspense>
      ),
    },
    {
      path: '/privacy_policy',
      element: (
        <Suspense fallback={<Loading />}>
          <Privacy />
        </Suspense>
      ),
    },
    {
      path: '/terms_and_conditions',
      element: (
        <Suspense fallback={<Loading />}>
          <Terms />
        </Suspense>
      ),
    },
    {
      path: '/faqs',
      element: (
        <Suspense fallback={<Loading />}>
          <FAQ />
        </Suspense>
      ),
    },
    {
      path: '/report_a_problem',
      element: (
        <Suspense fallback={<Loading />}>
          <Report />
        </Suspense>
      ),
    },
    {
      path: '/help',
      element: (
        <Suspense fallback={<Loading />}>
          <Help />
        </Suspense>
      ),
    },
    {
      path: '/dark_mode',
      element: (
        <Suspense fallback={<Loading />}>
          <DarkMode />
        </Suspense>
      ),
    },
    {
      path: '/recharge/mobile/number_select',
      element: (
        <Suspense fallback={<Loading />}>
          <SelectMobile />
        </Suspense>
      ),
    },
    {
      path: '/recharge/mobile/select_plan',
      element: (
        <Suspense fallback={<Loading />}>
          <SelectPlan />
        </Suspense>
      ),
    },
    {
      path: '/special_offer',
      element: (
        <Suspense fallback={<Loading />}>
          <SpecialOffer />
        </Suspense>
      ),
    },
  ],
  {
    basename: app.base,
  },
);

export function Loading() {
  return (
    <div className='screen flex items-center justify-center'>
      <img src={icons.loading} className='w-10 dark:invert' />
    </div>
  );
}

// function Error() {
//   return (
//     <div className='screen flex items-center justify-center text-center'>
//       <p>
//         Some Error Occurred <br /> Please Go Back
//       </p>
//     </div>
//   );
// }

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PopupAlertContextProvider>
        <PopupAlert />
        <RouterProvider router={router} />
      </PopupAlertContextProvider>
    </Provider>
  </React.StrictMode>,
);

import { useEffect, useMemo } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import ls from '../../lib/util';
import icons from '../../assets/icons/icons';
import transitions from '../../lib/transition';

function getLoginStatus() {
  return ls.get('isLoggedIn');
}

function logout() {
  ls.clear();
  window.location.reload();
}

const navItems = [
  {
    name: 'Home',
    path: '/',
    icon: icons.home,
    icon_filled: icons.home_filled,
  },
  {
    name: 'Wallet',
    path: '/wallet',
    icon: icons.wallet,
    icon_filled: icons.wallet_filled,
  },
  {
    name: 'Offers',
    path: '/offers',
    icon: icons.offers,
    icon_filled: icons.offers_filled,
  },
  {
    name: 'Refer',
    path: '/refer',
    icon: icons.home,
    icon_filled: icons.home_filled,
  },
];

export default function Home() {
  // Check If it is logged in
  const isLoggedIn = useMemo(() => getLoginStatus(), []);
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;

  // useEffect(() => {
  //   if (!isLoggedIn)
  //     navigate('/login', {
  //       replace: true,
  //     });
  // }, []);
  useEffect(() => {}, []);

  return (
    <div className='screen text-center'>
      <Outlet />
      <div className='fixed bottom-0 left-0 right-0 flex items-center justify-between border border-transparent border-t-gray-100  px-6 dark:border-t-gray-900'>
        {navItems.map((item, index) => (
          <div
            key={index}
            className={`tap99 flex flex-col items-center justify-center gap-1 px-5 pb-2 pt-3 transition ${
              path === item.path ? 'text-accent' : 'opacity-60'
            }`}
            onClick={
              // transitions(() =>
              () =>
                navigate(item.path, {
                  replace: true,
                })
              // )
            }
          >
            <img
              src={path === item.path ? item.icon_filled : item.icon}
              alt={item.name}
              className={`h-6 w-6 ${path === item.path ? '' : 'dark:invert'}`}
            />
            <span className='text-[0.7rem] font-normMid'>{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

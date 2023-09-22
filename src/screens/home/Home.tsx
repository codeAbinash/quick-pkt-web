import { useEffect, useMemo } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import icons from '../../assets/icons/icons';
import ls from '../../lib/util';

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
    className: 'w-[21px]',
    className_filled: 'w-[19.5px]',
  },
  {
    name: 'Offers',
    path: '/offers',
    icon: icons.offers,
    icon_filled: icons.offers_filled,
    className: 'w-[23.5px]',
    className_filled: 'w-[23.5px]',
  },
  {
    name: 'Refer',
    path: '/refer',
    icon: icons.send,
    icon_filled: icons.send_filled,
    className: 'w-[23px]',
    className_filled: 'w-[23px]',
  },
  {
    name: 'Wallet',
    path: '/wallet',
    icon: icons.wallet,
    icon_filled: icons.wallet_filled,
    className: 'w-[22.5px]',
    className_filled: 'w-[23.5px]',
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
    <div className='select-none'>
      <Outlet />
      <div className='fixed bottom-0 left-0 right-0 z-40 flex items-center justify-between border border-t-[0.5px] border-transparent border-t-[#77777744] bg-white/70 px-5 align-middle backdrop-blur-md dark:bg-black/60'>
        {navItems.map((item, index) => (
          <div
            key={index}
            className={`tap95 flex flex-grow flex-col items-center justify-center gap-[0.15rem] pb-2.5 pt-3.5 ${
              path === item.path ? 'text-accent' : 'text-black opacity-40 dark:text-white'
            }`}
            onClick={() => navigate(item.path, { replace: true })}
          >
            <div className='flex aspect-square h-[25px] items-start justify-center'>
              <img
                alt={item.name}
                className={`${path === item.path ? item.className_filled : ' dark:invert ' + item.className}`}
                src={path === item.path ? item.icon_filled : item.icon}
              />
            </div>
            <span className='text-center text-[0.65rem] font-normMid'>{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

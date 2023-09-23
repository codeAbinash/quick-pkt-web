import { useEffect, useMemo, useRef, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import icons from '../../assets/icons/icons';
import images from '../../assets/images/images';
import transitions from '../../lib/transition';
import ls from '../../lib/util';
import headerIntersect from '../../lib/headerIntersect';

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
const rechargeOptions = [
  {
    element: (
      <span>
        Mobile <br /> Recharge
      </span>
    ),
    icon: icons.mobile,
    name: 'Mobile Recharge',
  },
  {
    element: (
      <span>
        DTH <br /> Recharge
      </span>
    ),
    icon: icons.dth,
    name: 'DTH Recharge',
  },
  {
    element: (
      <span>
        Electricity <br /> Bill Pay
      </span>
    ),
    icon: icons.electricity,
    name: 'Electricity Bill Pay',
  },
  {
    element: (
      <span>
        Landline <br /> Bill Pay
      </span>
    ),
    icon: icons.landline,
    name: 'Landline Bill Pay',
  },
  {
    element: (
      <span>
        Broadband <br /> Recharge
      </span>
    ),
    icon: icons.broadband,
    name: 'Broadband Recharge',
  },
  {
    element: (
      <span>
        Gas Cylinder <br />
        Booking
      </span>
    ),
    icon: icons.gas,
    name: 'Gas Cylinder Booking',
  },
  {
    element: (
      <span>
        Rent <br /> Payment
      </span>
    ),
    icon: icons.rent,
    name: 'Rent Payment',
  },
  // {
  //   element: 'Postpaid',
  //   icon: icons.postpaid,
  // }
  {
    element: (
      <span>
        Google Play <br /> Recharge
      </span>
    ),
    icon: icons.google_play,
    name: 'Google Play Recharge',
  },
];

export default function Home() {
  // Check If it is logged in
  const isLoggedIn = useMemo(() => getLoginStatus(), []);
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;
  const intersect = useRef<HTMLParagraphElement>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);

  // useEffect(() => {
  //   if (!isLoggedIn)
  //     navigate('/login', {
  //       replace: true,
  //     });
  // }, []);
  useEffect(() => {
    headerIntersect(intersect.current as Element, setIsIntersecting);
  }, []);

  return (
    <div className='w-full select-none'>
      <p ref={intersect}></p>
      <div
        className={`${
          isIntersecting ? '' : 'shadow-sm dark:shadow-[#77777715]'
        } sticky top-0 z-40 flex w-full items-center justify-between border-b-[0.5px] border-transparent bg-white/90 px-4 py-3 backdrop-blur-md dark:bg-black dark:bg-black/80`}
      >
        <img src={images.logo_long} alt='Logo' className='h-9' />
        <div className='flex items-center justify-center gap-5'>
          <img src={icons.notification} alt='Notification Icon' className='tap95 w-[1.2rem] opacity-60 dark:invert' />
          <img src={icons.user} className='tap95 w-[2.1rem] rounded-full' alt='User Icon' />
        </div>
      </div>
      <Outlet />
      <div
        className='fixed bottom-0 left-0 right-0 z-40 flex items-center justify-between border border-t-[0.5px] border-transparent
        border-t-[#77777744] bg-white/90 px-5 align-middle backdrop-blur-md dark:bg-black/80
        md:bottom-4 md:mx-auto md:max-w-sm md:rounded-full md:border-[#77777744] md:px-0 md:shadow-lg'
      >
        {navItems.map((item, index) => (
          <div
            key={index}
            className={`tap95 highlight-none flex flex-grow cursor-pointer flex-col items-center justify-center gap-[0.15rem] pb-2.5 pt-3.5 ${
              path === item.path ? 'text-accent' : 'text-black opacity-50 dark:text-white dark:opacity-40'
            }`}
            onClick={transitions(() => navigate(item.path, { replace: true }), 0)}
          >
            <div className='flex aspect-square h-[25px] items-start justify-center'>
              <img
                className={path === item.path ? item.className_filled : ' dark:invert ' + item.className}
                src={path === item.path ? item.icon_filled : item.icon}
                alt={item.name}
              />
            </div>
            <span className='text-center text-[0.65rem] font-normMid'>{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

const bannerImages = [
  'https://images.unsplash.com/photo-1604999565976-8913ad2ddb7c?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=320&amp;h=160&amp;q=80',
  'https://images.unsplash.com/photo-1604999565976-8913ad2ddb7c?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=320&amp;h=160&amp;q=80',
  'https://images.unsplash.com/photo-1604999565976-8913ad2ddb7c?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=320&amp;h=160&amp;q=80',
  'https://images.unsplash.com/photo-1604999565976-8913ad2ddb7c?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=320&amp;h=160&amp;q=80',
  'https://images.unsplash.com/photo-1604999565976-8913ad2ddb7c?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=320&amp;h=160&amp;q=80',
];

const spotLightImages = [1, 2, 3, 4, 5, 6];

function Banner() {
  return (
    <div className='no-scrollbar relative mx-auto flex w-full max-w-4xl snap-x snap-mandatory gap-4 overflow-x-auto pb-5'>
      {bannerImages.map((_, index) => (
        <div
          key={index}
          className='tap97 flex aspect-[2/1] w-[80%] max-w-xs shrink-0 snap-center items-center justify-center overflow-hidden rounded-2xl bg-inputBg shadow-md first:ml-5 last:mr-5 md:aspect-auto'
        >
          <img className='w-full shrink-0 rounded-2xl' src={images.banner} />
        </div>
      ))}
    </div>
  );
}

function RechargeOptions() {
  return (
    <div className='mx-auto mt-3 max-w-4xl'>
      <p className='mb-4 ml-6 mt-1 text-sm font-normMid'>Recharge and Bill Payments</p>
      <div className='p-5 pt-2'>
        <div className='grid grid-cols-4 justify-center gap-y-6 rounded-2xl p-3 pb-7 pt-7 text-center shadow-[0_0_10px_0_rgba(0,0,0,0.15)] dark:shadow-[0_0_10px_0_rgba(255,255,255,0.1)]'>
          {rechargeOptions.map((item, index) => (
            <div key={index} className='tap95 flex flex-col items-center justify-center gap-1'>
              <div className='aspect-square'>
                <img className='w-8' src={item.icon} alt={item.name} />
              </div>
              <p className='mt-2  text-[0.6rem] font-normal leading-3 text-gray-700 dark:text-gray-300'>
                {item.element}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SpotLight() {
  return (
    <div className='mx-auto max-w-4xl'>
      <p className='mb-4 ml-6 mt-1 text-sm font-normMid'>Spotlight</p>
      <div className='no-scrollbar relative flex w-full snap-x snap-mandatory gap-4 overflow-x-auto pb-5'>
        {spotLightImages.map((_, index) => (
          <div
            key={index}
            className='tap97 flex aspect-[4/4] w-[35%] max-w-[200px] shrink-0 snap-center items-center justify-center overflow-hidden rounded-2xl bg-inputBg shadow-sm first:ml-5 last:mr-5'
          >
            <img className='w-full shrink-0 rounded-2xl' src={images.spotlight3} />
          </div>
        ))}
      </div>
    </div>
  );
}

function Featured() {
  return (
    <div className='mx-auto max-w-4xl'>
      <p className='mb-4 ml-6 mt-1 text-sm font-normMid'>Featured</p>
      <div className='no-scrollbar relative flex w-full snap-x snap-mandatory gap-4 overflow-x-auto pb-5'>
        {spotLightImages.map((_, index) => (
          <div
            key={index}
            className='tap97 flex aspect-[2/1] w-[90%] max-w-xs shrink-0 snap-center items-center justify-center overflow-hidden rounded-2xl bg-inputBg shadow-sm first:ml-5 last:mr-5'
          >
            <img className='w-full shrink-0 rounded-2xl' src={images.banner2} />
          </div>
        ))}
      </div>
    </div>
  );
}

function Bottom() {
  return (
    <div className='mt-16 w-full opacity-10'>
      <p className='text-center text-lg font-bold'>Quick PKT</p>
    </div>
  );
}

export function HomeScreen() {
  return (
    <div className='w-full pb-32 pt-5'>
      <Banner />
      <RechargeOptions />
      <SpotLight />
      <Featured />
      <Bottom />
    </div>
  );
}

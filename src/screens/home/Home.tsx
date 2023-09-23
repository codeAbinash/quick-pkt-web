import { useEffect, useMemo, useRef, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import icons from '../../assets/icons/icons';
import images from '../../assets/images/images';
import transitions from '../../lib/transition';
import ls from '../../lib/util';
import headerIntersect from '../../lib/headerIntersect';
import TextEmoji from '../../components/TextEmoji';
import { Bottom } from '../../components/Extras';
import { getCurrentUser } from '../../lib/api';

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

  async function getUserData() {
    const userData = await getCurrentUser();
    if (userData.status) {
      ls.set('userData', JSON.stringify(userData.data));
    }
    // console.log(userData.data);
  }

  useEffect(() => {
    // getUserData();
  }, []);

  return (
    <div className='w-full select-none'>
      <p ref={intersect}></p>
      <div
        className={`${
          isIntersecting ? '' : 'shadow-sm shadow-[#00000015] dark:shadow-[#ffffff15]'
        } sticky top-0 z-40 flex w-full items-center justify-between bg-white/90 px-4 py-3 backdrop-blur-md dark:bg-black dark:bg-black/80`}
      >
        <img src={images.logo_long} alt='Logo' className='h-9' />
        <div className='flex items-center justify-center gap-5'>
          <img src={icons.notification} alt='Notification Icon' className='tap95 w-[1.2rem] opacity-60 dark:invert' />
          <img
            src={icons.user}
            className='tap95 profile-picture w-[2.2rem] rounded-full'
            alt='User Icon'
            onClick={transitions(() => {
              navigate('/profile');
            })}
          />
        </div>
      </div>
      <Outlet />
      <div
        className='fixed bottom-[-1px] left-0 right-0 z-40 flex items-center justify-between border border-t-[0.5px] border-transparent
        border-t-[#77777744] bg-[#ffffffee] px-5 align-middle backdrop-blur-md dark:bg-black/90
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

const spotLightImages = [1, 2, 3];

function Banner() {
  return (
    <div className='no-scrollbar relative mx-auto flex w-full max-w-4xl snap-x snap-mandatory gap-4 overflow-x-auto pb-4'>
      {bannerImages.map((_, index) => (
        <div
          key={index}
          className='tap97 flex aspect-[2/1] w-[80%] max-w-xs shrink-0 snap-center items-center justify-center overflow-hidden rounded-3xl bg-inputBg shadow-md first:ml-5 last:mr-5 md:aspect-auto'
        >
          <img className='w-full shrink-0 rounded-3xl' src={images.banner} />
        </div>
      ))}
    </div>
  );
}

function SpecialOffers() {
  return (
    <div className='p-5'>
      <div className='mx-auto flex max-w-sm gap-4 rounded-3xl p-3 shadow-[0_0_5px_0_rgba(0,0,0,0.13)] dark:bg-white/10 dark:shadow-[0_0_10px_0_rgba(255,255,255,0)]'>
        <img src={images.spotlight2} className='aspect-square h-[6.5rem] rounded-2xl' />
        <div className='flex flex-col justify-center'>
          <div>
            <p className='text-[1rem] font-medium leading-5'>
              Guaranteed <span className='text-accent'>Cashback</span> <TextEmoji emoji='🤑' /> on every Recharge{' '}
              <TextEmoji emoji='🤩' />
            </p>
            <p className='mt-1.5 text-xs text-gray-500'>
              Special offer! <TextEmoji emoji='😳' /> Just for you! <TextEmoji emoji='😍' /> Get Cashback upto ₹10{' '}
              <TextEmoji emoji='🤑' /> Select any one option from bellow.
              <TextEmoji emoji='👇' />
            </p>
          </div>
          {/* <div className='mb-1 flex items-center text-center'>
            <button className='no-highlight tap95 flex-grow rounded-full bg-accentBright py-1.5 text-[0.6rem] font-medium text-white'>
              Recharge Now!
            </button>
            <button className='no-highlight tap95 flex-grow items-center justify-center gap-1  pl-3 text-[0.7rem] font-medium text-accentBright'>
              View Details
            </button>
          </div> */}
        </div>
      </div>
    </div>
  );
}

function RechargeOptions() {
  return (
    <div className='mx-auto mt-2 max-w-4xl'>
      <p className='mb-3 ml-6 text-sm font-normMid'>Recharge and Bill Payments</p>
      <div className='p-5 pt-2'>
        <div className='grid grid-cols-4 justify-center gap-y-6 rounded-3xl border border-[#77777722] bg-inputBg/50 p-3 pb-7 pt-7 text-center shadow-[0_0_10px_0_rgba(0,0,0,0)] dark:bg-white/10 dark:shadow-[0_0_10px_0_rgba(255,255,255,0.1)]'>
          {rechargeOptions.map((item, index) => (
            <div key={index} className='tap95 flex flex-col items-center justify-center gap-1'>
              <div className='aspect-square'>
                <img className='w-8' src={item.icon} alt={item.name} />
              </div>
              <p className='mt-2 text-[0.6rem] font-normal leading-3 text-gray-700 dark:text-gray-300'>
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
            className='tap97 flex aspect-[3/4] w-[35%] max-w-[200px] shrink-0 snap-center items-center justify-center overflow-hidden rounded-3xl bg-inputBg shadow-sm first:ml-5 last:mr-5'
          >
            <img className='aspect-[3/4] w-full shrink-0 rounded-3xl' src={images.spotlight3} />
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
      {/* <div className='no-scrollbar relative flex w-full snap-x snap-mandatory gap-4 overflow-x-auto pb-5'>
        {spotLightImages.map((_, index) => (
          <div
            key={index}
            className='tap97 flex aspect-[2/1] w-[90%] max-w-xs shrink-0 snap-center items-center justify-center overflow-hidden rounded-3xl bg-inputBg shadow-sm first:ml-5 last:mr-5'
          >
            <img className='w-full shrink-0 rounded-3xl' src={images.banner2} />
          </div>
        ))}
      </div> */}
      <div className='grid grid-cols-1 gap-4 p-4 md:grid-cols-2 lg:grid-cols-3'>
        {spotLightImages.map((_, index) => (
          <div className='aspect-[2/1] w-full overflow-hidden rounded-3xl'>
            <img src={images.banner2} className='w-full' />
          </div>
        ))}
      </div>
    </div>
  );
}

export function HomeScreen() {
  return (
    <div className='w-full pb-32 pt-2'>
      <Banner />
      <SpecialOffers />
      <RechargeOptions />
      <SpotLight />
      <Featured />
      <Bottom />
    </div>
  );
}

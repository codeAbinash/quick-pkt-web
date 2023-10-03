import { useNavigate } from 'react-router-dom';
import icons from '../../../assets/icons/icons';
import transitions from '../../../lib/transition';

const rechargeOptions = [
  {
    element: (
      <span>
        Mobile <br /> Recharge
      </span>
    ),
    icon: icons.mobile,
    name: 'Mobile Recharge',
    link: '/recharge/mobile',
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

export default function RechargeOptions() {
  const navigate = useNavigate();
  return (
    <div className='mx-auto w-full max-w-4xl'>
      {/* <p className='mb-2 ml-6 text-sm font-normMid'>Recharge and Bill Payments</p> */}
      <div className='px-5'>
        <div className='grid grid-cols-4 justify-center gap-y-6 rounded-3xl border border-[#77777722] bg-inputBg/50 p-3 pb-7 pt-7 text-center shadow-[0_0_10px_0_rgba(0,0,0,0)] dark:bg-white/10 dark:shadow-[0_0_10px_0_rgba(255,255,255,0.1)]'>
          {rechargeOptions.map((item, index) => (
            <div
              key={index}
              className='tap95 flex flex-col items-center justify-center gap-1'
              onClick={transitions(() => navigate(item.link || '/recharge'), 0)}
            >
              <div className='aspect-square'>
                <img className='w-8' src={item.icon} alt={item.name} />
              </div>
              <p className='mt-2 text-[0.6rem] font-420 leading-3 text-neutral-700 dark:text-neutral-300'>
                {item.element}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

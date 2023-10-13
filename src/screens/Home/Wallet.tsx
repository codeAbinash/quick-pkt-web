import icons from '../../assets/icons/icons';
import { Watermark } from '../../components/Extras';
import TapMotion from '../../components/TapMotion';

export default function Wallet() {
  return (
    <div className='mx-auto flex min-h-[80dvh] max-w-xl flex-col justify-between px-5'>
      <div className='flex flex-col gap-4'>
        <div className='flex flex-col gap-2 rounded-3xl bg-accent p-5 pt-4 text-white'>
          <div className='flex items-center justify-between'>
            <p className='font-medium'>Wallet Balance</p>
            <img src={icons.wallet} className='w-9 rounded-xl bg-black/20 p-2 invert' />
          </div>
          <p className='text-4xl font-semibold'>₹ 120.00</p>
          <div className='mt-2 grid grid-cols-2 gap-4 text-xs'>
            <TapMotion size='lg' className='rounded-btn bg-white/20 p-3.5 text-center font-normMid text-white'>
              Add Money
            </TapMotion>
            <TapMotion
              size='lg'
              className='rounded-btn bg-white/20 p-3.5 text-center font-normMid text-white opacity-50 '
            >
              Withdraw Money
            </TapMotion>
          </div>
        </div>
        <Options />
        {/* <Transactions /> */}
      </div>
      <Watermark />
    </div>
  );
}

type OptionsType = {
  name: string;
  icon: string;
  onclick?: () => void;
};

const options = [
  {
    name: 'Send',
    icon: icons.walletOptions.send,
    link: '/offers',
  },
  {
    name: 'Request',
    icon: icons.walletOptions.request,
    link: '/wallet',
  },
  {
    name: 'Scan',
    icon: icons.walletOptions.scan,
    link: '/refer',
  },
  {
    name: 'History',
    icon: icons.walletOptions.history,
    link: '/history',
  },
];
function Options() {
  return (
    <div className='mx-auto mt-1 grid w-full max-w-4xl grid-cols-4 gap-5 py-3 pb-1 pt-0'>
      {options.map((option, index) => (
        <div className='tap95 flex flex-col items-center justify-center gap-1' key={index}>
          <div className='rounded-[1.25rem] bg-accent/[0.15] p-4.5 dark:bg-accent/20'>
            <img src={option.icon} className='aspect-square w-6' />
          </div>
          <span className='text-[0.7rem] font-normMid opacity-80'>{option.name}</span>
        </div>
      ))}
    </div>
  );
}
function Transactions() {
  return (
    <div>
      <p className='pl-2 text-sm font-normMid'>Transactions</p>
      <div></div>
    </div>
  );
}

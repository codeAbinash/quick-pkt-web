import { useNavigate } from 'react-router-dom';
import transitions from '../../../lib/transition';
import icons from '../../../assets/icons/icons';

const options = [
  {
    name: 'Rewards',
    icon: icons.options.reward,
    link: '/offers',
  },
  {
    name: 'Wallet',
    icon: icons.options.wallet,
    link: '/wallet',
  },
  {
    name: 'Referrals',
    icon: icons.options.referrals,
    link: '/refer',
  },
];

export default function Options() {
  const navigate = useNavigate();
  return (
    <div className='mx-auto flex w-full max-w-4xl gap-5 px-7 py-3 pb-1 pt-0'>
      {options.map((option, index) => (
        <div
          className='tap95 flex flex-col items-center justify-center gap-1'
          key={index}
          onClick={transitions(() => navigate(option.link))}
        >
          <div className='rounded-full bg-accent/[0.15] p-4.5 dark:bg-accent/20'>
            <img src={option.icon} className='aspect-square w-5.5' alt={option.name} />
          </div>
          <span className='text-[0.7rem] font-normMid opacity-80'>{option.name}</span>
        </div>
      ))}
    </div>
  );
}

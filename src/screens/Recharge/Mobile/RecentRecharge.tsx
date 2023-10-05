import icons from '../../../assets/icons/icons';
import TapMotion from '../../../components/TapMotion';

const users = ['Abinash', 'Jyoti', '9547400680', 'Sourav'];

export default function RecentRecharges() {
  return (
    <div className='mt-4 flex select-none flex-col gap-6 rounded-2xl bg-inputBg px-6 py-4 pb-6 dark:bg-white/10'>
      <div className='flex justify-between text-sm font-medium'>
        <p className=''>Recent Recharges</p>
        <span className='rounded-md px-1.5 py-0.5 text-xs text-accent active:bg-accent/10 dark:active:bg-accent/20'>
          {' '}
          View All
        </span>
      </div>
      <div className='grid grid-cols-4 gap-8 px-1'>
        {users.map((user, index) => (
          <User name={user} key={index} />
        ))}
      </div>
    </div>
  );
}

function User({ name }: { name: string }) {
  return (
    <div className='flex flex-col items-center justify-center gap-2'>
      <TapMotion className='flex items-center justify-center'>
        <img src={icons.user} className='aspect-square w-full rounded-full' />
      </TapMotion>
      <p className='text-xs font-normMid'>{name}</p>
    </div>
  );
}

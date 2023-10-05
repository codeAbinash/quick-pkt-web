import { MouseEventHandler, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import icons from '../../../assets/icons/icons';
import TapMotion from '../../../components/TapMotion';
import { UserProfile } from '../../Profile/utils';

const users = ['Abinash', 'Ananta'];

type ParamsType = {
  setPhone: Function;
  setNickname: Function;
  setRechargeType: Function;
  setProvider: Function;
};

export default function RecentRecharges({ setPhone, setNickname, setRechargeType, setProvider }: ParamsType) {
  const profile: UserProfile = useSelector((state: any) => state.profile);

  const [users, setUsers] = useState<string[] | null>(null);
  useEffect(() => {
    const timer = setTimeout(() => {
      setUsers(['Abinash', 'Ananta']);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className='mt-4 flex select-none flex-col gap-4 rounded-2xl bg-inputBg px-4 py-4 pb-5 dark:bg-white/10'>
      <div className='flex justify-between pl-1.5 text-sm font-normMid'>
        <p>Suggestions</p>
        <span className='rounded-md px-1.5 py-0.5 text-xs text-accent active:bg-accent/10 dark:active:bg-accent/20'>
          View Recent
        </span>
      </div>
      <div className='grid grid-cols-4 gap-2'>
        <User
          name='Your Number'
          icon={profile?.data?.profile_pic || icons.user}
          onClick={() => {
            if (profile?.data?.mobile_number) setPhone(profile?.data?.mobile_number);
            if (profile?.data?.first_name) setNickname(profile?.data?.first_name);
            console.log(profile?.data?.first_name);
          }}
        />
        {users === null ? (
          <>
            <UserShimmer />
            <UserShimmer />
            <UserShimmer />
          </>
        ) : (
          users.map((user, index) => <User name={user} key={index} icon={icons.user} onClick={() => {}} />)
        )}
      </div>
    </div>
  );
}

// Extend ParamsType and make UserParamsType
type UserParamsType = { name: string; icon: string; onClick?: MouseEventHandler<HTMLDivElement> };

function User({ name, icon, onClick }: UserParamsType) {
  return (
    <div className='flex flex-col items-center justify-center gap-1.5' onClick={onClick}>
      <TapMotion size='sm' className='flex items-center justify-center'>
        <img src={icon} className='aspect-square w-[75%] rounded-full' />
      </TapMotion>
      <p className='text-[0.65rem] font-normMid'>{name}</p>
    </div>
  );
}

function UserShimmer() {
  return (
    <div className='flex flex-col items-center justify-center gap-1.5'>
      <div className='aspect-square w-[75%] animate-pulse rounded-full bg-neutral-200 dark:bg-neutral-800' />
      <div className='h-3 w-2/3 animate-pulse rounded-md bg-neutral-200 dark:bg-neutral-800' />
    </div>
  );
}

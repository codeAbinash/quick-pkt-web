import { useCallback, useState } from 'react';
import icons from '../../../assets/icons/icons';
import Button from '../../../components/Button';
import { Header } from '../../../components/Header/Header';
import TapMotion from '../../../components/TapMotion';
import transitions from '../../../lib/transition';

interface NavigatorWithContacts extends Navigator {
  contacts?: any;
}

type RechargeType = 'prepaid' | 'postpaid';
const providers = ['Jio', 'Airtel', 'BSNL', 'V!'];
const providerColors: {
  [key in (typeof providers)[number]]: { background: string; text: string };
} = {
  Jio: {
    background: '#0a2885',
    text: '#fff',
  },
  Airtel: {
    background: '#f60a0b',
    text: '#fff',
  },
  'V!': {
    background: '#ee2e3e',
    text: '#fff',
  },
  BSNL: {
    background: '#fff500',
    text: '#000',
  },
};

function phoneNumberParser(phone: string) {
  // Remove all non numeric characters
  phone = phone.replace(/\D/g, '');
  // If the length is greater than 10, remove the first digits
  if (phone.length > 10) phone = phone.slice(phone.length - 10);

  return phone;
}

type providerType = (typeof providers)[number];

export default function Mobile() {
  const [phone, setPhone] = useState('');
  const [nickname, setNickname] = useState('');
  const [rechargeType, setRechargeType] = useState<RechargeType>('prepaid');
  const [provider, setProvider] = useState<providerType>(providers[0]);

  const selectContact = useCallback(async () => {
    const props = ['name', 'email', 'tel', 'address', 'icon'];
    const opts = { multiple: true };
    try {
      const nav: NavigatorWithContacts = navigator;
      if (!nav.contacts) return console.log('No contacts API');
      const contacts = await nav.contacts.select(props, opts);
      setPhone(phoneNumberParser(contacts[0].tel[0]));
      setNickname(contacts[0].name[0]);
    } catch (ex) {
      console.error(ex);
    }
  }, [setPhone, setNickname]);

  return (
    <div className='colors select-none'>
      <Header>
        <span className='font-normMid'>Mobile Recharge</span>
      </Header>
      <div className='flex min-h-[calc(100vh-80px)] w-full flex-col items-center justify-between px-5'>
        <div className='w-full'>
          <RechargeType type={rechargeType} setType={setRechargeType} />
          <p className='pb-2 pl-1 text-xs font-normMid text-neutral-500'> Enter Mobile Number</p>
          <div className='flex w-full gap-3'>
            <div className='w-full rounded-2xl'>
              <div className='flex items-center justify-center rounded-btn bg-inputBg pl-4 dark:bg-white/10'>
                <img src={icons.phone} alt='Input Icon' className='flex w-6 opacity-40 dark:invert' />
                <input
                  type='tel'
                  placeholder='e.g. 9876543210'
                  className='grow border-none bg-transparent px-3 py-4 text-sm font-normMid text-text/90 outline-none dark:text-white'
                  onInput={(e: React.ChangeEvent<HTMLInputElement>) => setPhone(e.target.value)}
                  value={phone}
                />
              </div>
            </div>
            <TapMotion
              onClick={selectContact}
              size='sm'
              className='flex aspect-square items-center justify-center rounded-btn bg-inputBg px-4 dark:bg-white/10'
            >
              <img src={icons.contact_us} alt='Contact Picker' className='w-6 opacity-70 dark:invert' />
            </TapMotion>
          </div>
          <div className='mt-3'>
            <div className='flex w-full flex-col gap-4 rounded-2xl'>
              <div className='flex items-center justify-center rounded-btn bg-inputBg pl-4 dark:bg-white/10'>
                <img src={icons.nickname} alt='Input Icon' className='flex w-5.5 opacity-40 dark:invert' />
                <input
                  type='text'
                  placeholder='Nickname (Optional)'
                  className='grow border-none bg-transparent px-3 py-4 text-sm font-normMid text-text/90 outline-none dark:text-white'
                  onInput={(e: React.ChangeEvent<HTMLInputElement>) => setNickname(e.target.value)}
                  value={nickname}
                />
              </div>
              <ProviderType type={provider} setType={setProvider} />
            </div>
          </div>
          <RecentRecharges />
        </div>
        <WatermarkMid />
        <Button className='btn w-full'>Next</Button>
      </div>
    </div>
  );
}

export function WatermarkMid() {
  return (
    <div className='w-full select-none text-center opacity-[0.15]'>
      <p className='text-xl font-bold'>QUICK PKT</p>
      <p className='text-[0.6rem] font-bold leading-3'>A Quick way to Recharge</p>
    </div>
  );
}

const users = ['Abinash', 'Jyoti', '9547400680', 'Sourav'];

function RecentRecharges() {
  return (
    <div className='mt-4 flex select-none flex-col gap-5 rounded-2xl bg-inputBg px-6 py-4 pb-6 dark:bg-white/10'>
      <div className='flex justify-between text-sm font-medium'>
        <p className=''>Recent Recharges</p>
        <span className='text-xs text-accent active:bg-accent/10 dark:active:bg-accent/20'> View All</span>
      </div>
      <div className='grid grid-cols-4 gap-8 px-1'>
        {users.map((user) => (
          <User name={user} />
        ))}
      </div>
    </div>
  );
}

function User({ name }: { name: string }) {
  return (
    <div className='flex flex-col items-center justify-center gap-2'>
      <TapMotion className='flex items-center justify-center'>
        <img src={icons.user} alt='user img' className='aspect-square w-full rounded-full' />
      </TapMotion>
      <p className='text-xs font-normMid'>{name}</p>
    </div>
  );
}

function RechargeType({ type, setType }: { type: RechargeType; setType: (type: RechargeType) => void }) {
  return (
    <div className='mb-4 mt-2 flex justify-between gap-4 rounded-btn bg-inputBg p-1.5 text-xs font-medium dark:bg-white/10'>
      <div
        className={`tap97 flex-grow rounded-lg py-2.5 text-center ${type == 'prepaid' ? 'bg-white dark:bg-black' : ''}`}
        onClick={transitions(() => setType('prepaid'), 0)}
      >
        Prepaid
      </div>
      <div
        onClick={transitions(() => setType('postpaid'), 0)}
        className={`tap97 flex-grow rounded-lg py-2.5 text-center ${
          type == 'postpaid' ? 'bg-white dark:bg-black' : ''
        }`}
      >
        Postpaid
      </div>
    </div>
  );
}

// Set the main accent color of the sim card provider here

function ProviderType({ type, setType }: { type: providerType; setType: (type: providerType) => void }) {
  return (
    <div className='mb-2 mt-1 flex gap-3 text-sm'>
      {providers.map((provider) => (
        <div
          style={{
            backgroundColor: type == provider ? providerColors[provider].background : '',
            color: type == provider ? providerColors[provider].text : '',
          }}
          className={`tap97 rounded-full px-5 py-2 font-normMid ${
            type == provider ? 'bg-accent text-white' : 'bg-inputBg dark:bg-white/10'
          }`}
          onClick={transitions(() => setType(provider), 0)}
        >
          {provider}
        </div>
      ))}
    </div>
  );
}

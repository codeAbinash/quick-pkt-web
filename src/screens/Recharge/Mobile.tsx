import { useState } from 'react';

import icons from '../../assets/icons/icons';
import { Header } from '../../components/Header/Header';
import TapMotion from '../../components/TapMotion';
import Button from '../../components/Button';
import transitions from '../../lib/transition';

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
type providerType = (typeof providers)[number];

export default function Mobile() {
  const [phone, setPhone] = useState('');
  const [nickname, setNickname] = useState('');
  const [rechargeType, setRechargeType] = useState<RechargeType>('prepaid');
  const [provider, setProvider] = useState<providerType>(providers[0]);

  async function selectContact() {
    const props = ['name', 'email', 'tel', 'address', 'icon'];
    const opts = { multiple: true };

    try {
      const nav: NavigatorWithContacts = navigator;
      if (!nav.contacts) return console.log('No contacts API');
      const contacts = await nav.contacts.select(props, opts);
      setPhone(contacts[0].tel[0]);
      setNickname(contacts[0].name[0]);
    } catch (ex) {
      console.error(ex);
    }
  }
  return (
    <div className='colors'>
      <Header>
        <span className='font-normMid'>Mobile Recharge</span>
      </Header>
      <div className='w-full px-4'>
        <RechargeType type={rechargeType} setType={setRechargeType} />
        <div>
          <p className='font-normMid pb-2 pl-1 text-xs text-neutral-500'> Enter Mobile Number</p>
        </div>
        <div className='flex w-full gap-3.5'>
          <div className='w-full rounded-2xl'>
            <div className='rounded-btn bg-inputBg flex items-center justify-center pl-4 dark:bg-white/10'>
              <img src={icons.phone} alt='Input Icon' className='flex w-6 opacity-40 dark:invert' />
              <input
                type='tel'
                placeholder='e.g. 9876543210'
                className='font-normMid text-text/90 grow border-none bg-transparent px-3 py-4 text-sm outline-none dark:text-white'
                onInput={(e: React.ChangeEvent<HTMLInputElement>) => setPhone(e.target.value)}
                value={phone}
              />
            </div>
          </div>
          <TapMotion
            onClick={selectContact}
            size='sm'
            className='rounded-btn bg-accent flex aspect-square items-center justify-center px-4'
          >
            <img src={icons.contact_us} alt='Contact Picker' className='w-5.5 invert' />
          </TapMotion>
        </div>
        <div className='mt-3'>
          <div className='flex w-full flex-col gap-4 rounded-2xl'>
            <div className='rounded-btn bg-inputBg flex items-center justify-center pl-4 dark:bg-white/10'>
              <img src={icons.nickname} alt='Input Icon' className='w-5.5 flex opacity-40 dark:invert' />
              <input
                type='text'
                placeholder='Nickname (Optional)'
                className='font-normMid text-text/90 grow border-none bg-transparent px-3 py-4 text-sm outline-none dark:text-white'
                onInput={(e: React.ChangeEvent<HTMLInputElement>) => setNickname(e.target.value)}
                value={nickname}
              />
            </div>
            <ProviderType type={provider} setType={setProvider} />
            <Button className='btn w-full'>Next</Button>
          </div>
        </div>
      </div>
      {/* <RecentRecharges /> */}
    </div>
  );
}

const users = ['Abinash', 'Jyoti', '9547400680', 'Jyoti', 'Suman'];

function RecentRecharges() {
  return (
    <div className='mt-10 p-5'>
      <p className='text-center'>Recent Recharges</p>
      <div className='mt-10 grid grid-cols-4 gap-y-4'>
        {users.map((user) => (
          <User name={user} />
        ))}
        <User name='+' />
      </div>
    </div>
  );
}

function User({ name }: { name: string }) {
  return (
    <div className='flex flex-col items-center justify-center gap-2'>
      <TapMotion>
        <img src={icons.user} alt='user img' className='w-14 rounded-full' />
      </TapMotion>
      <p className='font-normMid text-xs'>{name}</p>
    </div>
  );
}

function RechargeType({ type, setType }: { type: RechargeType; setType: (type: RechargeType) => void }) {
  return (
    <div className='bg-inputBg rounded-btn mb-4 mt-2 flex justify-between gap-4 p-1.5 text-xs font-medium dark:bg-white/10'>
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
          className={`tap97 rounded-full px-5 py-2 ${
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

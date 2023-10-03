import { useState } from 'react';

import icons from '../../assets/icons/icons';
import { Header } from '../../components/Header/Header';
import TapMotion from '../../components/TapMotion';

interface NavigatorWithContacts extends Navigator {
  contacts?: any;
}

export default function Mobile() {
  const [phone, setPhone] = useState('');
  const [nickname, setNickname] = useState('');
  async function selectContact() {
    const props = ['name', 'email', 'tel', 'address', 'icon'];
    const opts = { multiple: true };

    try {
      const nav: NavigatorWithContacts = navigator;
      if (!nav.contacts) return console.log('No contacts API');
      const contacts = await nav.contacts.select(props, opts);
      alert(JSON.stringify(contacts));
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
        <div>
          <p className='pb-2 pl-1 text-sm font-normMid text-neutral-500'> Enter Mobile Number</p>
        </div>
        <div className='flex w-full gap-3.5'>
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
            className='flex aspect-square items-center justify-center rounded-btn bg-accent px-4'
          >
            <img src={icons.contact_us} alt='Contact Picker' className='w-6 invert' />
          </TapMotion>
        </div>
        <div className='mt-3'>
          <div className='w-full rounded-2xl'>
            <div className='flex items-center justify-center rounded-btn bg-inputBg pl-4 dark:bg-white/10'>
              <img src={icons.at} alt='Input Icon' className='flex w-6 opacity-40 dark:invert' />
              <input
                type='text'
                placeholder='Nickname (Optional)'
                className='grow border-none bg-transparent px-3 py-4 text-sm font-normMid text-text/90 outline-none dark:text-white'
                onInput={(e: React.ChangeEvent<HTMLInputElement>) => setNickname(e.target.value)}
                value={nickname}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

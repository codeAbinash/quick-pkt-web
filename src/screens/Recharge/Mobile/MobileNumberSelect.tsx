import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import icons from '../../../assets/icons/icons';
import Button from '../../../components/Button';
import { Header } from '../../../components/Header/Header';
import TapMotion from '../../../components/TapMotion';
import transitions from '../../../lib/transition';
import { blank_user_message, phoneNumberParser, phoneNumberValidation } from '../../../lib/util';
import { ProviderType } from './Provider';
import RecentRecharges from './RecentRecharge';

interface NavigatorWithContacts extends Navigator {
  contacts?: any;
}

type RechargeType = 'prepaid' | 'postpaid';
const options = { multiple: false };
const properties = ['name', 'tel'];

type ParamsType = {
  phone?: string;
  nickname?: string;
  type?: RechargeType;
  provider?: string;
};

export default function Mobile() {
  const [phone, setPhone] = useState('');
  const [nickname, setNickname] = useState('');
  const [rechargeType, setRechargeType] = useState<RechargeType>('prepaid');
  const [provider, setProvider] = useState<string>('');
  const navigate = useNavigate();
  const [message, setMessage] = useState(blank_user_message);
  const [params, setParams] = useSearchParams();
  const selectContact = useCallback(async () => {
    try {
      const nav: NavigatorWithContacts = navigator;
      if (!nav.contacts) return console.log('No contacts API');
      const contacts = await nav.contacts.select(properties, options);
      setPhone(phoneNumberParser(contacts[0].tel[0]));
      setNickname(contacts[0].name[0]);
    } catch (ex) {
      console.error(ex);
    }
  }, [setPhone, setNickname]);

  function mobileRecharge() {
    const validation = phoneNumberValidation(phone);
    if (!validation.status)
      return setMessage({
        message: validation.message,
        error: true,
      });
    navigate(
      `/recharge/mobile/select_plan?phone=${phone}&nickname=${nickname}&type=${rechargeType}&provider=${provider}`,
      {
        replace: true,
      },
    );
  }

  useEffect(() => {
    setMessage(blank_user_message);
  }, [phone]);

  // Extracting params from URL
  useEffect(() => {
    if (params.get('phone')) setPhone(params.get('phone')!);
    if (params.get('nickname')) setNickname(params.get('nickname')!);
    if (params.get('type')) setRechargeType(params.get('type')! as RechargeType);
    if (params.get('provider')) setProvider(params.get('provider')!);
  }, []);

  // Updating URL
  useEffect(() => {
    const p: ParamsType = {};
    if (phone) p.phone = phone;
    if (nickname) p.nickname = nickname;
    if (rechargeType) p.type = rechargeType;
    if (provider) p.provider = provider;
    setParams(p, { replace: true });
  }, [phone, nickname, rechargeType, provider]);

  return (
    <div className='colors select-none'>
      <Header>
        <span className='font-normMid'>Mobile Recharge</span>
      </Header>
      <div className='mx-auto flex min-h-[calc(100vh-80px)] w-full max-w-lg flex-col items-center justify-between px-5'>
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
                  maxLength={10}
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
                  maxLength={20}
                />
              </div>
              <ProviderType type={provider} setType={setProvider} />
            </div>
          </div>
          <RecentRecharges />
        </div>
        <WatermarkMid />
        <div className='flex w-full flex-col gap-3'>
          {message.message && (
            <p className={`${message.error ? 'text-red-500' : 'text-green-500'} text-center text-sm`}>
              {message.message}
            </p>
          )}
          <Button className='btn w-full' onClick={mobileRecharge}>
            Next
          </Button>
        </div>
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

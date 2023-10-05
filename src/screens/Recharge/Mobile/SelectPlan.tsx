import { json, useNavigate, useSearchParams } from 'react-router-dom';
import { Header } from '../../../components/Header/Header';
import transitions from '../../../lib/transition';
import { providerDetails } from './util';
import { useEffect, useState } from 'react';
import { getPlansMobile } from '../../../lib/api';

export default function SelectPlan() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const phone = params.get('phone');
  const nickname = params.get('nickname');
  const type = params.get('type');
  const [plans, setPlans] = useState('');
  const provider = params.get('provider') as keyof typeof providerDetails;

  function edit() {
    transitions(() => {
      navigate(`/recharge/mobile/number_select?phone=${phone}&nickname=${nickname}&type=${type}&provider=${provider}`, {
        replace: true,
      });
    }, 70)();
  }

  async function loadPlans() {
    const plans = await getPlansMobile(provider as string);
    setPlans(JSON.stringify(plans, null, 2));
  }

  useEffect(() => {
    loadPlans();
  }, []);

  return (
    <div className='colors font-normMid'>
      <Header onclick={edit}>
        <span className='font-normMid'>Select Plan</span>
      </Header>
      <div className='select-none px-5'>
        <div className='flex items-center justify-between rounded-2xl bg-inputBg px-4 py-4 pr-3 dark:bg-white/10'>
          <div className='flex flex-grow items-center gap-3'>
            <img src={providerDetails[provider].icon} className='aspect-square h-11 object-contain' />
            <div className='flex flex-col gap-1'>
              <span className='text-sm'>{nickname}</span>
              <span className='text-[0.7rem] capitalize opacity-70'>
                {phone} — {providerDetails[provider].name} {type}
              </span>
            </div>
          </div>

          <div className='tap95 block h-full rounded-lg p-3 text-xs text-accent transition-colors active:bg-accent/10'>
            <span onClick={edit}>Edit</span>
          </div>
        </div>

        <pre className='overflow-scroll'>
          <code className=''>{plans}</code>
        </pre>
      </div>
    </div>
  );
}

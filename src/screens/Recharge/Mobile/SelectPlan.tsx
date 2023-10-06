import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { providerDetails } from './util';
import jsonPlans from './plans.json';
import transitions from '../../../lib/transition';
import { Header } from '../../../components/Header/Header';
import TapMotion from '../../../components/TapMotion';
import { Watermark } from '../../../components/Extras';
import headerIntersect from '../../../lib/headerIntersect';
import icons from '../../../assets/icons/icons';
const tabs = ['All Plans', 'Data Add On', 'Top Up', 'Special Offer', 'Full Talk Time', 'Roaming', 'SMS', 'Validity'];
type PlanType = {
  amount: string;
  validity: string;
  description: string;
  planid: string;
};

export default function SelectRechargePlan() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const phone = params.get('phone');
  const nickname = params.get('nickname');
  const type = params.get('type');
  const [plans, setPlans] = useState<PlanType[] | null>(null);
  const provider = params.get('provider') as keyof typeof providerDetails;

  const edit = useCallback(() => {
    transitions(() => {
      navigate(`/recharge/mobile/number_select?phone=${phone}&nickname=${nickname}&type=${type}&provider=${provider}`, {
        replace: true,
      });
    }, 70)();
  }, [phone, nickname, type, provider]);

  const loadPlans = useCallback(async () => {
    // const plans = await getPlansMobile(provider as string);
    // if (plans.status) {
    // console.log(plans.data?.data);
    setPlans(jsonPlans);
    // }
  }, [provider]);
  useEffect(() => {
    loadPlans();
  }, []);

  return (
    <div>
      <Header onclick={edit}>
        <span className='font-normMid'>Select Plan</span>
      </Header>
      <div className='colors font-normMid'>
        <TapMotion size='lg' className='px-5' onClick={edit}>
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
              <span>Edit</span>
            </div>
          </div>
        </TapMotion>
      </div>
      <Plans plans={plans} />
      <Watermark />
    </div>
  );
}

function Plans({ plans }: { plans: PlanType[] | null }) {
  const [selectedTab, setSelectedTab] = useState<string>(tabs[0]);
  const [ascending, setAscending] = useState<boolean>(true);
  const intersect = useRef<HTMLParagraphElement>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);
  useEffect(() => {
    headerIntersect(intersect.current as Element, setIsIntersecting);
  }, []);
  return (
    <>
      <div
        className={`colors sticky top-0 z-40 border border-transparent pt-3.5 ${
          isIntersecting ? '' : 'shadow-sm shadow-[#00000015] dark:shadow-[#ffffff15]'
        }`}
      >
        <div className='select-none'>
          <div className='flex w-full flex-row gap-3 rounded-2xl px-5'>
            <div className='flex flex-grow items-center justify-center rounded-btn bg-inputBg pl-4 dark:bg-white/10'>
              <img src={icons.search} className='flex w-5 pb-0.5 opacity-40 dark:invert' />
              <input
                type='text'
                placeholder='Enter amount or search plans'
                className='grow border-none bg-transparent px-3 text-[0.8rem] font-420 text-text/90 outline-none dark:text-white'
                // onInput={(e: React.ChangeEvent<HTMLInputElement>) => setNickname(e.target.value)}
                // value={nickname}
              />
            </div>
            <TapMotion
              className='flex aspect-square flex-grow-0 items-center justify-center rounded-btn bg-inputBg px-3.5 dark:bg-white/10'
              onClick={() => setAscending(!ascending)}
            >
              <img
                src={icons.ordering}
                className={`w-5 opacity-50 dark:invert ${
                  ascending ? 'rotate-0' : 'rotate-180'
                } transition-transform duration-300`}
              />
            </TapMotion>
          </div>
        </div>
        <Disclaimer />
        <div>
          <div className='mt-1 select-none'>
            <div className='no-scrollbar flex gap-5 overflow-scroll px-5 py-4 pb-0 text-[0.8rem]'>
              {tabs.map((item, index) => (
                <div
                  key={index}
                  className={`${item === selectedTab ? 'selected' : ''} flex-shrink-0 pb-2`}
                  onClick={() => setSelectedTab(item)}
                >
                  <span
                    className={`${
                      item == selectedTab ? 'text-accent' : 'opacity-80'
                    }  px-1 font-normMid transition-colors active:text-accent`}
                  >
                    {item}
                  </span>
                  {item === selectedTab ? (
                    <motion.div
                      className='mt-0.5 h-[2.5px] rounded-[2px] rounded-b-[0] bg-accent'
                      layoutId='underline'
                      transition={{ duration: 0.15 }}
                    />
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div ref={intersect}></div>
      <div className='px-5 pt-4'>
        <AnimatePresence mode='wait'>
          <motion.div
            key={selectedTab}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.15 }}
            className='flex flex-col gap-3'
          >
            {plans === null ? 'Loading...' : plans.map((plan, index) => <Plan plan={plan} key={index} />)}
          </motion.div>
        </AnimatePresence>
      </div>
    </>
  );
}

function Plan({ plan }: { plan: PlanType }) {
  return (
    <TapMotion
      size='lg'
      className='group flex items-center justify-between gap-2 rounded-3xl bg-inputBg p-4 dark:bg-white/10'
    >
      <div className='flex flex-shrink-0 flex-grow-0 flex-col items-center justify-center px-2'>
        <p className='text-[1.1rem] font-medium'>₹{plan.amount}</p>
        <p className='text-[0.65rem] font-medium opacity-60'>{plan.validity}</p>
        <p className='text-[0.55rem] font-medium opacity-50'>{costPerDay(plan)}</p>
      </div>
      <div className='flex-grow'>
        <span className='line-clamp-4 text-[0.7rem] font-420 opacity-70'>{plan.description.split('+').join(',')}</span>
      </div>
    </TapMotion>
  );
}

function costPerDay(plan: PlanType): string {
  const amount = parseInt(plan.amount);
  const validity = parseInt(plan.validity);
  if (isNaN(amount) || isNaN(validity)) return '';
  return '₹' + (amount / validity).toFixed(2) + '/day';
}

function Disclaimer() {
  const [shown, setShown] = useState<boolean>(true);
  if (shown) {
    return (
      <div className='px-5 pt-4'>
        <div className='overflow-hidden rounded-2xl'>
          <div className='flex items-center justify-between gap-2 bg-accent/10 px-4 py-2 dark:bg-accent/10'>
            <span className='text-[0.6rem]'>
              <span className='font-normMid'>Disclaimer : </span>We almost cover all the plans. Please verify the plan
              details with your operator before proceeding.
            </span>
            <TapMotion
              onClick={transitions(() => setShown(false), 0)}
              className='tap95 block h-full flex-shrink-0 rounded-lg px-2 py-2.5 pl-2.5 text-[0.65rem] font-normMid uppercase text-accent'
            >
              <span>Got It</span>
            </TapMotion>
          </div>
        </div>
      </div>
    );
  }
  return null;
}

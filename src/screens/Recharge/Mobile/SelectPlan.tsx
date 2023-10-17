import { AnimatePresence, motion } from 'framer-motion';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { PlanType, setMobileRecharge, setMobileRechargeLs } from '../../../Redux/mobileRecharge';
import store from '../../../Redux/store';
import icons from '../../../assets/icons/icons';
import { Watermark } from '../../../components/Extras';
import { Header } from '../../../components/Header/Header';
import TapMotion from '../../../components/TapMotion';
import { getPlansMobile } from '../../../lib/api';
import headerIntersect from '../../../lib/headerIntersect';
import transitions from '../../../lib/transition';
import { OrganizedPlans, getOrganizedPlans, providerDetails } from './util';

export default function SelectRechargePlan() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const phone = params.get('phone');
  const nickname = params.get('nickname');
  const type = params.get('type');
  const provider = params.get('provider') as keyof typeof providerDetails;
  const plans = useSelector((state: any) => state.mobileRecharge.plans[provider] || null);
  const [organizedPlans, setOrganizedPlans] = useState<OrganizedPlans | null>(null);
  // const lastUpdated = useSelector((state: any) => state.mobileRecharge.lastUpdated[provider] || null);

  const edit = useCallback(() => {
    transitions(() => {
      navigate(`/recharge/mobile/number_select?phone=${phone}&nickname=${nickname}&type=${type}&provider=${provider}`, {
        replace: true,
      });
    }, 70)();
  }, [phone, nickname, type, provider]);

  const loadPlans = useCallback(async () => {
    // Check if the data is not old enough
    // if (plans && lastUpdated && Date.now() - lastUpdated < 1000 * 60 * 60) {
    //   console.log('Using old plans ' + Date.now());
    //   return;
    // }
    if (plans) {
      const organizedPlans = getOrganizedPlans(plans as PlanType[], provider as string);
      setOrganizedPlans(organizedPlans);
      return;
    }
    const plansRes = await getPlansMobile(provider as string);
    if (plansRes.status) {
      const organizedPlans = getOrganizedPlans(plansRes.data?.data as PlanType[], provider as string);
      setOrganizedPlans(organizedPlans);
      store.dispatch(setMobileRecharge({ key: provider as string, value: plansRes.data?.data as PlanType[] }));
      setMobileRechargeLs();
    }
  }, []);
  useEffect(() => {
    loadPlans();
  }, []);

  return (
    <div className='mx-auto max-w-lg'>
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
                <span className='text-[0.65rem] capitalize opacity-70'>
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
      {organizedPlans === null ? (
        <>
          <TabsShimmer />
          <PlansShimmer />
        </>
      ) : (
        <Plans plans={organizedPlans} setPlans={setOrganizedPlans} />
      )}
      <Watermark />
    </div>
  );
}

function matchedPlans(plan: PlanType, str: string): boolean {
  return (
    plan.description.toLowerCase().includes(str) ||
    plan.amount.includes(str) ||
    plan.validity.includes(str) ||
    costPerDay(plan).includes(str)
  );
}

function searchPlan(plans: OrganizedPlans, str: string, ascending: boolean): OrganizedPlans {
  const newPlans: OrganizedPlans = {};
  str = str.trim().toLowerCase();
  if (str === '' && ascending) return plans;
  if (str === '' && !ascending) {
    for (const key in plans) newPlans[key] = [...plans[key]].reverse();
    return newPlans;
  }
  for (const key in plans) {
    newPlans[key] = plans[key].filter((plan) => matchedPlans(plan, str));
    if (!ascending) newPlans[key].reverse();
  }
  return newPlans;
}

function Plans({ plans, setPlans }: { plans: OrganizedPlans; setPlans: Function }) {
  const intersect = useRef<HTMLParagraphElement>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const tabs = Object.keys(plans || {});
  const [plansToShow, setPlansToShow] = useState<OrganizedPlans>(plans);
  const [selectedTab, setSelectedTab] = useState<string>(tabs[0]);
  const [ascending, setAscending] = useState<boolean>(false);
  const [search, setSearch] = useState<string>('');

  useEffect(() => {
    headerIntersect(intersect.current as Element, setIsIntersecting);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setPlansToShow(searchPlan(plans, search, ascending));
    }, 200);
    return () => clearTimeout(timer);
  }, [search, plans]);

  useEffect(() => {
    setPlansToShow(searchPlan(plans, search, ascending));
  }, [plans, ascending]);

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
                className='grow border-none bg-transparent px-3 text-[0.8rem] font-normMid text-text/90 outline-none dark:text-white'
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
                onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                  if (e.nativeEvent.key === 'Enter') {
                    // @ts-ignore
                    e.nativeEvent.target.blur();
                  }
                }}
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
                  onClick={() => {
                    setSelectedTab(item);
                  }}
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
            className='flex min-h-[30dvh] flex-col gap-3'
          >
            {plansToShow[selectedTab].length === 0 ? (
              <NoResult search={search} />
            ) : (
              plansToShow[selectedTab].map((plan, index) => <Plan key={index} plan={plan} />)
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </>
  );
}

function NoResult({ search }: { search: string }) {
  return (
    <div className='flex min-h-[45dvh] flex-col items-center justify-center'>
      <img src={icons.no_result_found} className='w-3/4 dark:invert' />
      <span className='text-[0.8rem] font-normMid opacity-50'>No results for "{search}"</span>
    </div>
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
          <div className='flex items-center justify-between gap-2 bg-accent/10 px-4 py-2 dark:bg-accent/20'>
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

function TabShimmer() {
  return <span className='tap95 animate-pulse rounded-lg bg-inputBg p-4 px-10 dark:bg-white/10'></span>;
}
function TabsShimmer({ tabs }: { tabs?: number }) {
  if (!tabs) tabs = 5;

  return (
    <div className='w-full px-5 pt-6'>
      <div className='no-scrollbar flex w-full gap-5 overflow-scroll'>
        <div className='flex flex-shrink-0 gap-4 pb-2'>
          {[...Array(tabs)].map((_, index) => (
            <TabShimmer key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
// A simple shimmer that contain nothing
function PlanShimmer() {
  return (
    <div className='flex animate-pulse  items-center justify-between gap-2 rounded-3xl bg-inputBg p-4 py-10 dark:bg-white/10'></div>
  );
}

function PlansShimmer({ plans }: { plans?: number }) {
  if (!plans) plans = 10;
  return (
    <div className='px-5 pt-4'>
      <div className='flex flex-col gap-3'>
        {[...Array(plans)].map((_, index) => (
          <PlanShimmer key={index} />
        ))}
      </div>
    </div>
  );
}

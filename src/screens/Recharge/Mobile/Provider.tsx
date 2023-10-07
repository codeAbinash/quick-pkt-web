import { useCallback, useEffect, useMemo, useState } from 'react';
import { getOperators } from '../../../lib/api';
import transitions from '../../../lib/transition';
import { Provider, getProviderLs, providerDetails, setProviderLs } from './util';
import icons from '../../../assets/icons/icons';
import TapMotion from '../../../components/TapMotion';

export function ProviderType({ type, setType }: { type: string; setType: (type: string) => void }) {
  const [providers, setProviders] = useState<Provider[] | null>(useMemo(getProviderLs, []));
  const [isOpen, setIsOpen] = useState(false);
  const getProvider = useCallback(async () => {
    setType(providers?.[0].short_code || '');
    try {
      const provider = await getOperators();
      console.log(provider);
      setProviders(provider.data.data);
      if (providers == null) setType(provider.data.data[0].short_code);
      setProviderLs(provider.data.data);
    } catch (e) {
      console.log(e);
    }
  }, []);

  useEffect(() => {
    getProvider();
  }, []);

  if (providers == null)
    return (
      <div className='my-1.5 flex gap-2'>
        <div className='tap97 shimmer rounded-full px-10 py-4.5'></div>
        <div className='tap97 shimmer rounded-full px-8 py-4.5'></div>
        <div className='tap97 shimmer rounded-full px-7 py-4.5'></div>
        <div className='tap97 shimmer rounded-full px-9 py-4.5'></div>
      </div>
    );

  function selectProvider() {
    setIsOpen(true);
  }

  return (
    <>
      <ProviderSelect
        setProvider={setType}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        providers={providers}
        provider={type}
      />
      <div className='flex items-center justify-between px-6 py-4 pb-1'>
        <p className='pl-1 text-[0.8rem] font-normMid opacity-80'>Network Operator</p>
        <div
          className='flex items-center justify-center gap-4'
          onClick={transitions(() => {
            selectProvider();
          })}
        >
          <img src={providerDetails[type]?.icon} className='h-8' />

          <TapMotion
            size='lg'
            className={`${
              !isOpen && ' select-provider-button'
            } flex items-center justify-between gap-2 rounded-btn bg-inputBg py-3.5 pl-6 pr-3.5 text-sm dark:bg-white/10`}
          >
            {providerDetails[type]?.name}
            <div>
              <img src={icons.select} className='w-5 opacity-70 dark:invert' />
            </div>
          </TapMotion>
        </div>
      </div>
      {/* <div className='no-scrollbar mb-2 mt-1 flex gap-3 overflow-auto px-5 pt-4'>
      {providers.map((operator, index) => (
        <div
          key={index}
          style={{
            backgroundColor: type == operator.short_code ? providerDetails[operator.short_code]?.background : '',
            color: type == operator?.short_code ? providerDetails[operator.short_code]?.text : '',
          }}
          className={`tap97 flex-shrink-0 rounded-full px-5 py-2.5 text-[0.8rem] font-normMid ${
            type == operator?.short_code ? 'bg-accent text-white' : 'bg-inputBg dark:bg-white/10'
          }`}
          onClick={transitions(() => setType(operator.short_code), 0)}
        >
          {operator.name}
        </div>
      ))}
    </div> */}
    </>
  );
}

function ProviderSelect({
  providers,
  provider,
  setProvider,
  isOpen,
  setIsOpen,
}: {
  providers: Provider[] | null;
  provider: string;
  setProvider: (provider: string) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}) {
  if (!isOpen || !providers) return null;
  return (
    <div className='fixed inset-0 z-50 mx-auto flex items-center justify-center bg-black/10 font-normMid'>
      <div
        onClick={() => setIsOpen(false)}
        className={`${
          isOpen && 'select-provider-button'
        } w-full max-w-[350px] rounded-3xl bg-white/90 p-6 pb-9 text-center backdrop-blur-md dark:bg-black/90`}
      >
        <p className='font-medium'>Select Provider</p>
        <div className='mt-5 flex flex-col items-center justify-between gap-1'>
          {providers.map((provider, index) => (
            <div
              key={index}
              className={`tap97 w-full max-w-[300px] rounded-btn bg-[#0000000d] py-4 text-sm font-normMid dark:bg-white/10`}
              onClick={(e) => {
                e.stopPropagation();
                transitions(() => {
                  setProvider(provider.short_code);
                  setIsOpen(false);
                }, 0)();
              }}
            >
              {provider.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

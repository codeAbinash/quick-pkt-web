// Set the main accent color of the sim card provider here

import { useCallback, useEffect, useMemo, useState } from 'react';
import { getOperators } from '../../../lib/api';
import transitions from '../../../lib/transition';
import { Provider, getProviderLs, providerDetails, setProviderLs } from './util';

export function ProviderType({ type, setType }: { type: string; setType: (type: string) => void }) {
  const [providers, setProviders] = useState<Provider[] | null>(useMemo(getProviderLs, []));
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
        <div className='tap97 shimmer rounded-full px-10 py-4.5 font-normMid'></div>
        <div className='tap97 shimmer rounded-full px-8 py-4.5 font-normMid'></div>
        <div className='tap97 shimmer rounded-full px-7 py-4.5 font-normMid'></div>
        <div className='tap97 shimmer rounded-full px-9 py-4.5 font-normMid'></div>
      </div>
    );

  return (
    <div className='no-scrollbar mb-2 mt-1 flex gap-3 overflow-auto text-sm'>
      {providers.map((provider, index) => (
        <div
          key={index}
          style={{
            backgroundColor: type == provider.short_code ? providerDetails[provider.short_code]?.background : '',
            color: type == provider?.short_code ? providerDetails[provider.short_code]?.text : '',
          }}
          className={`tap97 flex-shrink-0 rounded-full px-5 py-3 text-xs font-normMid ${
            type == provider?.short_code ? 'bg-accent text-white' : 'bg-inputBg dark:bg-white/10'
          }`}
          onClick={transitions(() => setType(provider.short_code), 0)}
        >
          {provider.name}
        </div>
      ))}
    </div>
  );
}

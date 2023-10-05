import { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { setSpotlights } from '../../../Redux/spotlights';
import store from '../../../Redux/store';
import { getSpotlights } from '../../../lib/api';
import { SpotlightType, setSpotlightsLs } from './utils';

export default function SpotLight() {
  const spotlights: SpotlightType[] | null = useSelector((state: any) => state.spotlights);

  const loadSpotLight = useCallback(async () => {
    const spotLightStatus = await getSpotlights();
    if (spotLightStatus.status) {
      store.dispatch(setSpotlights(spotLightStatus.data.data as SpotlightType[]));
      setSpotlightsLs(spotLightStatus.data.data as SpotlightType[]);
    }
  }, []);

  useEffect(() => {
    loadSpotLight();
  }, []);

  return (
    <div className='mx-auto w-full max-w-4xl'>
      <p className='mb-3 ml-6 text-sm font-normMid'>Spotlight</p>

      {spotlights === null ? (
        <div className='no-scrollbar relative flex w-full snap-x snap-mandatory gap-4 overflow-x-auto lg:rounded-3xl'>
          <div className='tap99 shimmer flex aspect-[3/4] w-[35%] max-w-[200px] shrink-0 snap-center rounded-3xl first:ml-5 last:mr-5' />
          <div className='tap99 shimmer flex aspect-[3/4] w-[35%] max-w-[200px] shrink-0 snap-center rounded-3xl first:ml-5 last:mr-5' />
          <div className='tap99 shimmer flex aspect-[3/4] w-[35%] max-w-[200px] shrink-0 snap-center rounded-3xl first:ml-5 last:mr-5' />
        </div>
      ) : (
        <div className='no-scrollbar relative flex w-full snap-x snap-mandatory gap-4 overflow-x-auto lg:rounded-3xl'>
          {spotlights.map((spotlight) => (
            <div
              key={spotlight.id}
              onClick={() => {
                if (spotlight.link) window.open(spotlight.link, '_blank');
              }}
              className='tap99 flex aspect-[3/4] w-[35%] max-w-[200px] shrink-0 snap-center items-center justify-center overflow-hidden rounded-3xl bg-inputBg shadow-sm first:ml-5 last:mr-5 dark:bg-white/10'
            >
              <img className='aspect-[3/4] w-full shrink-0 rounded-3xl' src={spotlight.path} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

import { useCallback, useEffect, useMemo, useState } from 'react';
import { getFeatured } from '../../../lib/api';
import { FeaturedType, getFeaturedLs, setFeaturedLs } from './utils';

export default function Featured() {
  const featuredData = useMemo(getFeaturedLs, []);
  const [featured, setFeatured] = useState<FeaturedType[] | null>(featuredData);

  const loadFeatured = useCallback(async () => {
    const featuredStatus = await getFeatured();
    console.log(featuredStatus);
    if (featuredStatus.status) {
      setFeatured(featuredStatus.data.data as FeaturedType[]);
      setFeaturedLs(featuredStatus.data.data as FeaturedType[]);
    }
  }, []);

  useEffect(() => {
    loadFeatured();
  }, []);

  return (
    <div className='mx-auto w-full max-w-4xl'>
      <p className='ml-6 text-sm font-normMid'>Featured</p>
      <div className='grid grid-cols-1 gap-4 p-5 md:grid-cols-2 lg:grid-cols-3'>
        {featured === null ? (
          <>
            <div className='tap99 shimmer aspect-[2/1] w-full overflow-hidden rounded-3xl'></div>
            <div className='tap99 shimmer aspect-[2/1] w-full overflow-hidden rounded-3xl'></div>
          </>
        ) : (
          featured.map((featured) => (
            <div
              key={featured.id}
              onClick={() => {
                if (featured.link) window.open(featured.link, '_blank');
              }}
              className='tap99 aspect-[2/1] w-full overflow-hidden rounded-3xl bg-inputBg dark:bg-white/10'
            >
              <img src={featured.path} className='w-full' alt={featured.name} />
            </div>
          ))
        )}
      </div>
    </div>
  );
}

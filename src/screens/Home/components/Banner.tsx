import { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getBanners } from '../../../lib/api';
import { BannerType, setBannersLs } from './utils';
import store from '../../../Redux/store';
import { setBanners } from '../../../Redux/banners';

export default function Banner() {
  // const containerRef = useRef<HTMLDivElement>(null);
  const banners: BannerType[] | null = useSelector((state: any) => state.banners);

  const loadBanners = useCallback(async () => {
    const bannersStatus = await getBanners();
    if (bannersStatus.status) {
      store.dispatch(setBanners(bannersStatus.data.data as BannerType[]));
      setBannersLs(bannersStatus.data.data as BannerType[]);
    }
  }, []);

  useEffect(() => {
    loadBanners();
  }, []);

  return (
    <div
      className='no-scrollbar relative mx-auto flex w-full max-w-4xl snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-1.5 lg:rounded-3xl'
      // ref={containerRef}
    >
      {banners == null ? (
        <div className='shimmer tap99 flex aspect-[2/1] w-[100%] max-w-sm shrink-0 snap-center items-center justify-center overflow-hidden rounded-3xl  first:ml-5 last:mr-5  md:aspect-auto'></div>
      ) : (
        banners.map((banner) => (
          <div
            key={banner.id}
            onClick={() => {
              if (banner.link) window.open(banner.link, '_blank');
            }}
            className='tap99 flex aspect-[2/1] w-[100%] max-w-sm shrink-0 snap-center items-center justify-center overflow-hidden rounded-3xl bg-inputBg  first:ml-5 last:mr-5 dark:bg-white/10 md:aspect-auto'
          >
            <img className='w-full shrink-0 rounded-3xl' src={banner.path} alt={banner.name} />
          </div>
        ))
      )}
    </div>
  );
}

// useEffect(() => {
//   const container = containerRef.current;

//   const scrollInterval = setInterval(() => {
//     if (container) {
//       container.scrollLeft += container.clientWidth;
//       if (container.scrollLeft === container.scrollWidth - container.clientWidth) {
//         // Scroll back to the beginning when reaching the end
//         container.scrollLeft = 0;
//       }
//     }
//   }, 3000); // Adjust the interval (in milliseconds) to control the scrolling speed
//   // Clear the interval when the component unmounts
//   return () => {
//     clearInterval(scrollInterval);
//   };
// }, []);
// useEffect(() => {
//   // Scroll only 1 item
//   const container = containerRef.current;
//   if (container) {
//     container.scrollLeft = container.clientWidth;
//   }
// }, []);

import { useEffect, useRef } from 'react';
import images from '../../../assets/images/images';

const bannerImages = [
  'https://images.unsplash.com/photo-1604999565976-8913ad2ddb7c?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=320&amp;h=160&amp;q=80',
  'https://images.unsplash.com/photo-1604999565976-8913ad2ddb7c?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=320&amp;h=160&amp;q=80',
  'https://images.unsplash.com/photo-1604999565976-8913ad2ddb7c?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=320&amp;h=160&amp;q=80',
  'https://images.unsplash.com/photo-1604999565976-8913ad2ddb7c?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=320&amp;h=160&amp;q=80',
  'https://images.unsplash.com/photo-1604999565976-8913ad2ddb7c?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=320&amp;h=160&amp;q=80',
];

export default function Banner() {
  const containerRef = useRef<HTMLDivElement>(null);
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
  useEffect(() => {
    // Scroll only 1 item
    const container = containerRef.current;
    if (container) {
      container.scrollLeft = container.clientWidth;
    }
  }, []);
  return (
    <div
      className='no-scrollbar relative mx-auto flex w-full max-w-4xl snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-1.5 lg:rounded-3xl'
      ref={containerRef}
    >
      {bannerImages.map((_, index) => (
        <div
          key={index}
          className='tap99 bg- flex aspect-[2/1] w-[100%] max-w-sm shrink-0 snap-center items-center justify-center overflow-hidden rounded-3xl shadow-md first:ml-5 last:mr-5 dark:bg-white/10 md:aspect-auto'
        >
          <img className='w-full shrink-0 rounded-3xl' src={images.banner2} />
        </div>
      ))}
    </div>
    // <div
    //   className='no-scrollbar relative mx-auto mb-4 flex w-full max-w-4xl snap-x snap-mandatory gap-4 overflow-x-auto lg:rounded-3xl'
    //   ref={containerRef}
    // >
    //   {bannerImages.map((_, index) => (
    //     <div
    //       key={index}
    //       className='tap97 flex aspect-[2/1] w-[80%] max-w-xs shrink-0 snap-center items-center justify-center overflow-hidden rounded-3xl bg-inputBg shadow-md first:ml-5 last:mr-5 md:aspect-auto'
    //     >
    //       <img className='w-full shrink-0 rounded-3xl' src={images.banner2} />
    //     </div>
    //   ))}
    // </div>
  );
}

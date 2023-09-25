import images from '../../../assets/images/images';

const featuredImages = [1, 2];

export default function Featured() {
  return (
    <div className='mx-auto w-full max-w-4xl'>
      <p className='ml-6 text-sm font-normMid'>Featured</p>
      {/* <div className='no-scrollbar relative flex w-full snap-x snap-mandatory gap-4 overflow-x-auto pb-5'>
         {spotLightImages.map((_, index) => (
           <div
             key={index}
             className='tap97 flex aspect-[2/1] w-[90%] max-w-xs shrink-0 snap-center items-center justify-center overflow-hidden rounded-3xl bg-inputBg shadow-sm first:ml-5 last:mr-5'
           >
             <img className='w-full shrink-0 rounded-3xl' src={images.banner2} />
           </div>
         ))}
       </div> */}
      <div className='grid grid-cols-1 gap-4 p-5 md:grid-cols-2 lg:grid-cols-3'>
        {featuredImages.map((_, index) => (
          <div
            className='tap99 aspect-[2/1] w-full overflow-hidden rounded-3xl bg-inputBg dark:bg-white/10'
            key={index}
          >
            <img src={images.banner} className='w-full' alt={'Featured' + index} />
          </div>
        ))}
      </div>
    </div>
  );
}

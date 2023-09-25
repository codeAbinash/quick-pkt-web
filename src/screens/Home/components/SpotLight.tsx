import images from '../../../assets/images/images';

const spotLightImages = [1, 2, 3, 4];

export default function SpotLight() {
  return (
    <div className='mx-auto w-full max-w-4xl'>
      <p className='mb-3 ml-6 text-sm font-normMid'>Spotlight</p>
      <div className='no-scrollbar relative flex w-full snap-x snap-mandatory gap-4 overflow-x-auto lg:rounded-3xl'>
        {spotLightImages.map((_, index) => (
          <div
            key={index}
            className='tap99 flex aspect-[3/4] w-[35%] max-w-[200px] shrink-0 snap-center items-center justify-center overflow-hidden rounded-3xl bg-inputBg shadow-sm first:ml-5 last:mr-5 dark:bg-white/10'
          >
            <img
              className='aspect-[3/4] w-full shrink-0 rounded-3xl'
              src={images.spotlight3}
              alt={'Spotlight' + index}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

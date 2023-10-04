import { useNavigate } from 'react-router-dom';
import images from '../../assets/images/images';
import { Header } from '../../components/Header/Header';
import TextEmoji from '../../components/TextEmoji';
import transitions from '../../lib/transition';

export default function SpecialOffer() {
  const navigate = useNavigate();
  return (
    <>
      <Header onclick={transitions(() => navigate('/', { replace: true }))}>
        <span className='font-normMid'>Special Offer</span>{' '}
      </Header>
      <div className='px-5'>
        <img src={images.spotlight3} className='special-offer-image w-full rounded-3xl' />
        <p className='mt-5 flex items-center pl-2 text-base font-medium'>
          Special Offer for You
          <span className='flex items-start pl-1 text-[1rem]'>
            <TextEmoji emoji='😍' />
          </span>
        </p>
        <div className='mt-4 flex flex-col gap-2 rounded-2xl bg-inputBg p-4 dark:bg-white/10'>
          <p className='pl-2 text-sm font-normal leading-4 text-neutral-500 dark:text-neutral-400'>
            Cashback on every recharge or bill payment. If you recharge or pay bill you will get cashback. Select option
            from bellow.
          </p>

          <p className='pl-2 text-sm font-normal leading-4 text-neutral-500 dark:text-neutral-400'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla aliquam saepe error quibusdam deserunt?
            Aperiam dolorum vitae pariatur beatae facilis!
          </p>

          <p className='pl-2 text-sm font-normal leading-4 text-neutral-500 dark:text-neutral-400'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla aliquam saepe error quibusdam deserunt?
            Aperiam dolorum vitae pariatur beatae facilis! Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </p>
        </div>
      </div>
    </>
  );
}

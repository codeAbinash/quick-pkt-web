import { useNavigate } from 'react-router-dom';
import images from '../../../assets/images/images';
import TextEmoji from '../../../components/TextEmoji';
import transitions from '../../../lib/transition';

export default function SpecialOffers() {
  const navigate = useNavigate();
  return (
    <div className='px-5' onClick={transitions(() => navigate('/special_offer'))}>
      <div className='tap99 mx-auto flex max-w-sm gap-2 rounded-3xl border border-[#77777722] bg-inputBg/50 p-3 shadow-[0_0_4px_0_rgba(0,0,0,0.0)] dark:bg-white/10 dark:shadow-[0_0_10px_0_rgba(255,255,255,0.1)]'>
        <img src={images.spotlight3} className='special-offer-image aspect-square h-[5.3rem] rounded-2xl' />
        <div className='flex flex-col'>
          <div className='flex grow flex-col justify-between py-0.5'>
            <p className='special-offer-heading flex items-center pl-2 text-[0.9rem] font-normMid'>
              Special Offer for You
              <span className='flex items-start pl-1 text-[1rem]'>
                <TextEmoji emoji='😍' />
              </span>
            </p>
            <p className='text-balance special-offer-text pl-2 text-[0.7rem] font-normal leading-4 text-neutral-500 dark:text-neutral-400'>
              Cashback on every recharge or bill payment. Select option from bellow.
            </p>
            <div className='flex'>
              <p className='rounded-md px-2 py-0.5 text-xs font-420 text-accent active:bg-accent/10 active:dark:bg-accent/10'>
                More Details
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

{
  /* <div className='mb-1 flex items-center text-center'>
  <button className='no-highlight tap95 flex-grow rounded-full bg-accentBright py-1.5 text-[0.6rem] font-medium text-white'>
    Recharge Now!
  </button>
  <button className='no-highlight tap95 flex-grow items-center justify-center gap-1  pl-3 text-[0.7rem] font-medium text-accentBright'>
  View Details
  </button>
</div> */
}

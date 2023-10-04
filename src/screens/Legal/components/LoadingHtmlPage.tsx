import icons from '../../../assets/icons/icons';
import { Watermark } from '../../../components/Extras';

export default function LoadingHtmlPage() {
  return (
    <div className='flex min-h-[90dvh] flex-col items-center justify-between'>
      <p></p>
      <div className=''>
        <img src={icons.loading} alt='Loading' className='w-10 dark:invert' />
      </div>
      <Watermark />
    </div>
  );
}

import { useNavigate } from 'react-router-dom';
import icons from '../assets/icons/icons';
import { blank_fn } from '../lib/util';
import { TextButton } from './Button';
import transitions from '../lib/transition';

export default function ReadPrivacyPolicyTerms() {
  const navigate = useNavigate();
  return (
    <div>
      <p className='text-center text-xxs text-neutral-500 dark:text-neutral-400'>
        By signing up you accept our{' '}
        <TextButton
          onClick={transitions(() => {
            navigate('/privacy_policy');
          })}
        >
          Privacy Policy
        </TextButton>
        and
        <TextButton
          onClick={transitions(() => {
            navigate('/terms_and_conditions');
          })}
        >
          Terms & Conditions
        </TextButton>
      </p>
    </div>
  );
}
export function Watermark() {
  return (
    <div className='mb-10 mt-10 w-full select-none text-center opacity-[0.15]'>
      <p className='text-xl font-bold'>QUICK PKT</p>
      <p className='text-[0.6rem] font-bold leading-3'>A Quick way to Recharge</p>
    </div>
  );
}

type InputProps = {
  placeholder: string;
  icon?: string;
  onInput?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  label?: string;
  value?: string;
};

export function Input(props: InputProps) {
  const {
    placeholder = 'Input Placeholder',
    icon = icons.mobile_solid,
    type = 'text',
    onInput = blank_fn,
    label = 'Input Label',
    value = '',
  } = props;

  return (
    <div>
      <p className='pb-2 pl-1 text-xs font-normMid text-neutral-500'>{label}</p>
      <div className='flex items-center justify-center rounded-btn bg-inputBg pl-4 dark:bg-white/10'>
        <img src={icon} alt='Input Icon' className='flex w-6 opacity-30 dark:invert' />
        <input
          type={type}
          placeholder={placeholder}
          className='grow border-none bg-transparent px-3 py-4.5 text-sm font-normMid text-text/90 outline-none dark:text-white'
          onInput={onInput}
          value={value}
        />
      </div>
    </div>
  );
}

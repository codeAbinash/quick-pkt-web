import { useHref, useNavigate } from 'react-router-dom';
import icons from '../assets/icons/icons';
import { blank_fn } from '../lib/util';
import headerIntersect from '../lib/headerIntersect';
import { useState, useEffect, useRef } from 'react';

export default function ReadPrivacyPolicyTerms() {
  return (
    <div>
      <p className='text-center text-xxs text-gray-500 dark:text-gray-400'>
        By signing up you accept our <span className='text-accent'>Privacy Policy</span> and{' '}
        <span className='text-accent'>Terms of Service</span>
      </p>
    </div>
  );
}
export function Bottom() {
  return (
    <div className='mb-10 mt-10 w-full text-center opacity-[0.15]'>
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

export function Input(
  props: InputProps = {
    placeholder: 'Input Placeholder',
    icon: icons.mobile_solid,
    onInput: blank_fn,
    type: 'text',
    label: 'Input Label',
    value: '',
  },
) {
  const { placeholder, icon, type, onInput, label, value } = props;
  return (
    <div>
      <p className='pb-2 pl-1 text-xs font-normMid text-gray-500'>{label}</p>
      <div className='flex items-center justify-center rounded-btn bg-inputBg pl-4 dark:bg-white/10'>
        <img src={icon} alt='Input Icon' className='flex w-5.5 opacity-30 dark:invert' />
        <input
          type={type}
          placeholder={placeholder}
          className='grow border-none bg-transparent px-3 py-4.5 text-sm font-normMid outline-none'
          onInput={onInput}
          value={value}
        />
      </div>
    </div>
  );
}

export function Header({ children, onclick = blank_fn }: { children?: React.ReactNode; onclick?: Function }) {
  const intersect = useRef<HTMLParagraphElement>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    headerIntersect(intersect.current as Element, setIsIntersecting);
  }, []);
  return (
    <>
      <p ref={intersect}></p>
      <div
        className={`sticky top-0 z-40 flex w-full items-center gap-2 bg-white/80 px-3 py-1.5 backdrop-blur-md dark:bg-black dark:bg-black/70 ${
          isIntersecting ? '' : 'shadow-sm shadow-[#00000015] dark:shadow-[#ffffff15]'
        }`}
      >
        <div
          className='tap95 rounded-full p-2.5 active:bg-inputBg active:dark:bg-white/20'
          onClick={() => {
            if (onclick == blank_fn) navigate(-1);
            onclick();
          }}
        >
          <img src={icons.back} alt='Back' className='w-[1.65rem] dark:invert' />
        </div>
        <div>{children}</div>
      </div>
    </>
  );
}

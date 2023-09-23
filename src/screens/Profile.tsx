import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import icons from '../assets/icons/icons';
import headerIntersect from '../lib/headerIntersect';
import transitions from '../lib/transition';
import { blank_fn } from '../lib/util';
import Button from '../components/Button';
import { Bottom } from '../components/Extras';
import { getCurrentUser } from '../lib/api';

export function Header({ children }: { children?: React.ReactNode }) {
  const intersect = useRef<HTMLParagraphElement>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    headerIntersect(intersect.current as Element, setIsIntersecting);
  }, []);
  async function getUserData() {
    const userData = await getCurrentUser();
    console.log(userData.data);
  }
  useEffect(() => {
    getUserData();
  }, []);
  return (
    <>
      <p ref={intersect}></p>
      <div
        className={`sticky top-0 z-40 flex w-full items-center gap-2 bg-white/80 px-3 py-1.5 backdrop-blur-md dark:bg-black dark:bg-black/70
        ${isIntersecting ? '' : 'shadow-sm shadow-[#00000015] dark:shadow-[#ffffff15]'} 
        `}
      >
        <div
          className='tap95 rounded-full p-2.5 active:bg-[#77777722]'
          onClick={transitions(() => {
            navigate('/', {
              replace: true,
            });
          })}
        >
          <img src={icons.back} alt='Back' className='w-[1.65rem] dark:invert' />
        </div>
        <div>{children}</div>
      </div>
    </>
  );
}

export default function Profile() {
  return (
    <div className='w-full'>
      <Header>
        <p className='font-normMid'>Profile</p>
      </Header>
      <div className='relative mx-auto mb-4 max-w-lg'>
        <img src={icons.user} className='profile-picture mx-auto w-1/2 rounded-full' />
        <div
          className='tap95 absolute left-[60%] top-[80%] aspect-square h-12 rounded-full bg-white p-3.5 shadow-lg'
          onClick={blank_fn}
        >
          <img src={icons.pen_solid} className='editIcon' />
        </div>
      </div>
      <div>
        <p className='text-center text-2xl font-semibold'>John Doe</p>
        {/* Mobile Number */}
        <div className='mt-1 flex items-center justify-center gap-2'>
          <p className='text-base font-normMid text-gray-500'>+91 9876543210</p>
        </div>
      </div>
      <div className='mx-auto mt-5 flex max-w-lg flex-col gap-3 p-5 pt-2'>
        <Input placeholder='e.g. John' label='First Name' icon={icons.user_solid} />
        <Input placeholder='e.g. Doe' label='Last Name' icon={icons.user_solid} />
        <Input placeholder='e.g. abc@gmail.com' label='Email' type='email' icon={icons.at} />
        <Button className='btn shine mt-4'>
          <p className='text-sm'>Update Profile</p>
        </Button>
      </div>
      <Bottom />
    </div>
  );
}

type InputProps = {
  placeholder: string;
  icon?: string;
  onInput?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  label?: string;
};

export function Input(
  props: InputProps = {
    placeholder: 'Input Placeholder',
    icon: icons.mobile_solid,
    onInput: blank_fn,
    type: 'text',
    label: 'Input Label',
  },
) {
  const { placeholder, icon, type, onInput, label } = props;
  return (
    <div>
      <p className='pb-2 pl-1 text-xs font-normMid text-gray-500'>{label}</p>
      <div className='flex items-center justify-center rounded-btn bg-inputBg pl-5 dark:bg-white/10'>
        <img src={icon} alt='Input Icon' className='flex w-4 opacity-20 dark:invert' />
        <input
          type={type}
          placeholder={placeholder}
          className='grow border-none bg-transparent px-3 py-4.5 text-sm font-normMid outline-none'
          onInput={onInput}
        />
      </div>
    </div>
  );
}

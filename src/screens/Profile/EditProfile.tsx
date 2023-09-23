import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import icons from '../../assets/icons/icons';
import headerIntersect from '../../lib/headerIntersect';
import transitions from '../../lib/transition';
import { blank_fn } from '../../lib/util';
import Button from '../../components/Button';
import { Bottom, Header, Input } from '../../components/Extras';
import { getCurrentUser } from '../../lib/api';

export default function EditProfile() {
  const [firstName, setFirstName] = useState('John');
  const [lastName, setLastName] = useState('Doe');
  const [mobile, setMobile] = useState('+91 9876543210');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  return (
    <div className='w-full'>
      <Header onclick={transitions(() => navigate('/profile', { replace: true }))}>
        <p className='font-normMid'>Profile</p>
      </Header>
      <div className='relative mx-auto mb-4 max-w-lg'>
        <img src={icons.user} className='profile-picture mx-auto w-1/2 rounded-full' />
        <div
          className='tap95 anim-edit-icon absolute left-[60%] top-[80%] aspect-square h-12 rounded-full bg-white p-3 shadow-lg'
          onClick={blank_fn}
        >
          <img src={icons.edit} className='editIcon' />
        </div>
      </div>
      <div>
        <p className='anim-user-name text-center text-2xl font-semibold'>
          {firstName} {lastName}
        </p>
        <div className='mt-1 flex items-center justify-center gap-2'>
          <p className='anim-user-phone text-base font-normMid text-gray-500'>{mobile}</p>
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

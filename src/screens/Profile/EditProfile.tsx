import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import app from '../../../app';
import icons from '../../assets/icons/icons';
import Button from '../../components/Button';
import { Bottom, Input } from '../../components/Extras';
import API, { authorizedHeader, formDataHeaders, getCurrentUser } from '../../lib/api';
import transitions from '../../lib/transition';
import ls, { blank_fn } from '../../lib/util';
import { getProfileInfo, setProfileInfo } from './utils';
import { Header } from '../../components/Header/Header';

async function updateLocalUserData() {
  const userProfileData = await getCurrentUser();
  if (userProfileData.status) {
    setProfileInfo(userProfileData.data);
  }
}

export default function EditProfile() {
  const profile = useMemo(getProfileInfo, []);
  // const profile = {
  //   status: true,
  //   data: {
  //     id: 1,
  //     first_name: 'John',
  //     last_name: 'Doe',
  //     mobile_number: '9547400680',
  //     email: 'cod',
  //   },
  // };
  const [firstName, setFirstName] = useState(profile.data.first_name || '');
  const [lastName, setLastName] = useState(profile.data.last_name || '');
  const [mobile, setMobile] = useState(profile.data.mobile_number || '');
  const [email, setEmail] = useState(profile.data.email || '');
  const [profilePicture, setProfilePicture] = useState(profile.data.profile_pic || icons.user);
  const [isUpdating, setIsUpdating] = useState(false);
  const [userMessage, setUserMessage] = useState({
    message: '',
    error: false,
  });
  const navigate = useNavigate();

  type userUpdate = {
    first_name?: string;
    last_name?: string;
    email?: string;
  };
  const updateProfile = async () => {
    setIsUpdating(true);
    const body: any = {} as userUpdate;
    if (firstName) body.first_name = firstName.trim();
    if (lastName) body.last_name = lastName.trim();
    if (email) body.email = email.trim();
    const formData = new FormData();
    for (const key in body) formData.append(key, body[key]!);
    const res = await fetch(API.update_user, {
      method: 'POST',
      headers: authorizedHeader(formDataHeaders),
      body: formData,
    });
    console.log(body);
    const data = await res.json();
    console.log(data);
    if (data.status) {
      await updateLocalUserData();
      setUserMessage({ message: data.message, error: false });
      setIsUpdating(false);
    } else {
      setIsUpdating(false);
      setUserMessage({ message: data.message, error: true });
    }
  };

  return (
    <div className='w-full select-none'>
      <Header onclick={transitions(() => navigate('/profile', { replace: true }))}>
        <p className='font-normMid'>Edit Profile</p>
      </Header>
      <div className='relative mx-auto mb-4 max-w-lg'>
        <img
          src={profilePicture}
          className='profile-picture mx-auto aspect-square w-[45%] rounded-full bg-inputBg dark:bg-white/10'
        />
        <div
          className='tap95 anim-edit-icon absolute left-[60%] top-[80%] aspect-square h-11 rounded-full bg-white p-3 shadow-lg'
          onClick={blank_fn}
        >
          <img src={icons.edit} className='editIcon' />
        </div>
      </div>
      <div>
        <p className='anim-user-name text-center text-xl font-semibold'>
          {firstName || lastName ? firstName + ' ' + lastName : 'Update Name'}
        </p>
        <div className='mt-1 flex items-center justify-center gap-2'>
          <p className='anim-user-phone text-sm font-normMid text-gray-500'>+91 {mobile}</p>
        </div>
      </div>
      {userMessage.message && (
        <p className={`${userMessage.error ? 'text-red-500' : 'text-green-500'} mt-2 text-center text-xs font-normMid`}>
          {userMessage.message}
        </p>
      )}
      <div className='mx-auto mt-5 flex max-w-lg flex-col gap-3 p-5 pt-0'>
        <Input
          placeholder='e.g. John'
          label='First Name'
          icon={icons.account_circle}
          value={firstName}
          onInput={(e) => {
            setFirstName(e.target.value);
          }}
        />
        <Input
          placeholder='e.g. Doe'
          label='Last Name'
          icon={icons.user_circle}
          value={lastName}
          onInput={(e) => {
            setLastName(e.target.value);
          }}
        />
        <Input
          placeholder='e.g. abc@gmail.com'
          label='Email'
          type='email'
          icon={icons.at}
          value={email}
          onInput={(e) => {
            setEmail(e.target.value);
          }}
        />
        {isUpdating ? (
          <div className='mt-4 flex animate-pulse items-center justify-center gap-3 p-[1rem] pr-5 text-sm'>
            <img src={icons.loading} className='w-5 dark:invert' />
            <p>Updating Profile</p>
          </div>
        ) : (
          <Button className='btn shine mt-4' onClick={updateProfile}>
            <p className='text-sm'>Update Profile</p>
          </Button>
        )}
      </div>
      <Bottom />
    </div>
  );
}

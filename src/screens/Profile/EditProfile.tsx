import { useCallback, useMemo, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setProfile } from '../../Redux/profile';
import store from '../../Redux/store';
import icons from '../../assets/icons/icons';
import Button from '../../components/Button';
import { Bottom, Input } from '../../components/Extras';
import { Header } from '../../components/Header/Header';
import API, { authorizedHeader, formDataHeaders, getCurrentUser, getError } from '../../lib/api';
import transitions from '../../lib/transition';
import { UserProfile, setProfileInfoLs } from './utils';

async function updateLocalUserData() {
  const userProfileData = await getCurrentUser();
  if (userProfileData.status) {
    setProfileInfoLs(userProfileData.data);
    store.dispatch(setProfile(userProfileData.data as UserProfile));
  }
}

function ProfilePicture({
  imageUrl,
  onImageClick,
}: {
  imageUrl?: string;
  onImageClick?: (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => void;
}) {
  return (
    <div className='relative mx-auto mb-4 max-w-lg'>
      <img
        src={imageUrl}
        onClick={onImageClick}
        className='tap97 profile-picture mx-auto aspect-square w-[45%] rounded-full bg-inputBg object-cover dark:bg-white/10'
      />
      <div
        onClick={onImageClick}
        className='tap95 anim-edit-icon absolute left-[60%] top-[75%] aspect-square h-12 rounded-full bg-white p-3 shadow-lg'
      >
        <img src={icons.edit} className='editIcon' />
      </div>
    </div>
  );
}

function getFullName(firstName: string, lastName: string) {
  return firstName || lastName ? `${firstName} ${lastName}` : 'Update Name';
}

function profilePicFileValidation(file: File): userMessage {
  const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg'];
  const maxSize = 2 * 1024 * 1024;
  console.log(file);
  if (!allowedTypes.includes(file.type))
    return {
      message: 'Invalid file type (only .png, .jpeg, .jpg)',
      error: true,
    };
  if (file.size > maxSize)
    return {
      message: 'Max File Size is 2MB',
      error: true,
    };
  return { message: '', error: false };
}

type userMessage = {
  message: string;
  error: boolean;
};
const blank_user_message: userMessage = { message: '', error: false };

export default function EditProfile() {
  const profile: UserProfile = useSelector((state: any) => state.profile);
  const [firstName, setFirstName] = useState(profile?.data?.first_name || '');
  const [lastName, setLastName] = useState(profile?.data.last_name || '');
  const mobile = profile?.data.mobile_number;
  const [email, setEmail] = useState(profile?.data.email || '');
  const [profilePicture, setProfilePicture] = useState(profile?.data.profile_pic || icons.user);
  const [isUpdating, setIsUpdating] = useState(false);
  const pp = useRef<HTMLInputElement>(null);
  const fullName = useMemo(() => getFullName(firstName, lastName), [firstName, lastName]);
  const [userMessage, setUserMessage] = useState(blank_user_message);
  const navigate = useNavigate();

  type userUpdate = {
    first_name?: string;
    last_name?: string;
    email?: string;
    profile_pic?: File;
  };

  const clearUserMessage = useCallback(() => {
    setUserMessage(blank_user_message);
  }, []);

  const updateProfile = useCallback(async () => {
    setIsUpdating(true);
    const body: any = {} as userUpdate;
    if (firstName) body.first_name = firstName.trim();
    if (lastName) body.last_name = lastName.trim();
    if (email) body.email = email.trim();

    if (profilePicture !== profile?.data?.profile_pic) {
      const ppValidation = profilePicFileValidation(pp.current!.files![0]);
      if (ppValidation.error) {
        setUserMessage(ppValidation);
        setIsUpdating(false);
        return;
      }
      body.profile_pic = pp.current!.files![0];
    }

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
      setIsUpdating(false);
      setUserMessage({
        message: 'Profile Updated Successfully',
        error: false,
      });
    } else {
      setIsUpdating(false);
      setUserMessage({
        message: getError(data.errors),
        error: true,
      });
    }
  }, [firstName, lastName, email, profilePicture, isUpdating]);

  const onChangeFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    clearUserMessage();
    const fileInput = e.target.files;
    const ppValidation = profilePicFileValidation(fileInput![0]);
    if (ppValidation.error) return setUserMessage(ppValidation);
    setProfilePicture(URL.createObjectURL(fileInput![0]));
  }, []);

  // useEffect(() => {
  //   setUserMessage(blank_user_message);
  // }, [firstName, lastName, email, profilePicture, isUpdating]);

  return (
    <div className='w-full select-none'>
      <Header onclick={transitions(() => navigate('/profile', { replace: true }))}>
        <p className='font-normMid'>Edit Profile</p>
      </Header>
      <input
        type='file'
        className='hidden'
        ref={pp}
        onChange={onChangeFileSelect}
        accept='image/png, image/jpeg, image/jpg'
      />
      <ProfilePicture imageUrl={profilePicture} onImageClick={() => pp.current?.click()} />
      <div>
        <p className='anim-user-name text-center text-xl font-semibold'>{fullName}</p>
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
          onInput={(e) => (setFirstName(e.target.value), clearUserMessage())}
        />
        <Input
          placeholder='e.g. Doe'
          label='Last Name'
          icon={icons.user_circle}
          value={lastName}
          onInput={(e) => (setLastName(e.target.value), clearUserMessage())}
        />
        <Input
          placeholder='e.g. abc@gmail.com'
          label='Email'
          type='email'
          icon={icons.at}
          value={email}
          onInput={(e) => setEmail(e.target.value)}
        />
        {isUpdating ? (
          <div className='mt-4 flex animate-pulse items-center justify-center gap-3 p-[1rem] pr-5 text-sm'>
            <img src={icons.loading} className='w-5 dark:invert' />
            <p>Updating Profile</p>
          </div>
        ) : (
          <Button className='btn shine mt-4' onClick={updateProfile}>
            Update Profile
          </Button>
        )}
      </div>
      <Bottom />
    </div>
  );
}

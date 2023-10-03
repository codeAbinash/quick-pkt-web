/**
 * This component should not rerender on profile update
 */

import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import icons from '../../assets/icons/icons';
import { Bottom } from '../../components/Extras';
import { Header } from '../../components/Header/Header';
import transitions from '../../lib/transition';
import { blank_fn } from '../../lib/util';
import { UserProfile } from './utils';
import TapMotion from '../../components/TapMotion';

type Option = {
  name: string;
  icon: string;
  onClick?: Function;
  className?: string;
  classNameIcon?: string;
  link?: string;
  small?: string | Function;
};
type OptionGroup = {
  groupName: string;
  options: Option[];
};
const OPTIONS: OptionGroup[] = [
  {
    groupName: 'Account',
    options: [
      {
        name: 'Edit Profile',
        icon: icons.edit,
        link: '/profile/edit',
        classNameIcon: 'anim-edit-icon',
        small: (profile: UserProfile) => {
          return profile?.data.first_name;
        },
      },
      {
        name: 'Log Out',
        icon: icons.log_out,
        className: 'text-red-600',
        classNameIcon: '',
        small: 'Log out',
        // link: '/log_out',
      },
    ],
  },
  {
    groupName: 'System',
    options: [
      {
        name: 'Dark Mode',
        icon: icons.dark_mode,
        link: '/dark_mode',
        small: (_: UserProfile, settings: any) => {
          return settings?.theme || 'Auto';
        },
      },
      {
        name: 'Language',
        icon: icons.language,
        small: 'English',
      },
    ],
  },
  {
    groupName: 'Support',
    options: [
      {
        name: 'Help',
        icon: icons.help,
        link: '/help',
      },
      {
        name: 'Report a Problem',
        icon: icons.report,
        link: '/report_a_problem',
      },
      {
        name: 'Rate Us',
        icon: icons.rate,
        // link : 'https'
      },
      {
        name: 'FAQs',
        icon: icons.help,
        link: '/faqs',
      },
    ],
  },
  {
    groupName: 'Legal',
    options: [
      {
        name: 'Terms and Conditions',
        icon: icons.terms,
        link: '/terms_and_conditions',
      },
      {
        name: 'Privacy Policy',
        icon: icons.privacy_policy,
        link: '/privacy_policy',
      },
    ],
  },
  {
    groupName: 'About',
    options: [
      {
        name: 'About Us',
        icon: icons.about_us,
        link: '/about_us',
      },
      {
        name: 'Contact Us',
        icon: icons.contact_us,
        link: '/contact_us',
      },
    ],
  },
];

export default function Profile() {
  const profile = useSelector((state: any) => state.profile);
  const firstName = profile?.data.first_name || 'Your';
  const lastName = profile?.data.last_name || 'Name';
  const mobile = '+91 ' + (profile?.data.mobile_number || '');
  const profilePicture = profile?.data.profile_pic || icons.user;
  const settings = useSelector((state: any) => state.settings);

  const navigate = useNavigate();
  return (
    <div className='colors select-none'>
      <Header onclick={transitions(() => navigate('/', { replace: true }))}>
        <p className='font-normMid'>More Options</p>
      </Header>
      <div className='mt-5'>
        <div className='relative mx-auto mb-4 max-w-lg'>
          <TapMotion size='lg' className='mx-auto w-[40%]'>
            <img
              src={profilePicture}
              onClick={transitions(() => navigate('/profile/edit'), 0)}
              className='profile-picture tap97 mx-auto aspect-square w-full rounded-full bg-inputBg object-cover dark:bg-white/10'
            />
          </TapMotion>
        </div>
      </div>
      <div>
        <p className='anim-user-name text-center text-xl font-semibold'>
          {firstName} {lastName}
        </p>
        <div className='mt-1 flex items-center justify-center gap-2'>
          <p className='anim-user-phone text-sm font-normMid text-neutral-500'>{mobile}</p>
        </div>
      </div>

      <div className='mx-auto max-w-lg p-5'>
        {OPTIONS.map((optionGroup: OptionGroup, i: number) => (
          <div className='mt-5' key={i}>
            <p className='pl-2 text-sm font-normMid text-zinc-500'>{optionGroup.groupName}</p>
            <div className='mt-3 flex flex-col gap-2 rounded-2xl bg-inputBg/60 p-4 dark:bg-[rgb(255,255,255,0.06)]'>
              {optionGroup.options.map((option: Option, i: number) => (
                <div
                  className='tap99 flex items-center justify-between p-2 pl-2 pr-0'
                  key={i}
                  onClick={
                    option.link
                      ? transitions(() => navigate(option.link!))
                      : option.onClick
                      ? transitions(() => option.onClick!())
                      : blank_fn
                  }
                >
                  <div className='flex w-full items-center justify-between gap-6'>
                    <div className='flex items-center gap-5'>
                      <img
                        src={option.icon}
                        alt=''
                        className={`aspect-square w-5.5 opacity-80 dark:opacity-90 dark:invert ${
                          option.classNameIcon ? option.classNameIcon : ''
                        }`}
                      />
                      <span
                        className={`text-[0.85rem] font-420 opacity-90 ${option.className ? option.className : ''}`}
                      >
                        {option.name}
                      </span>
                    </div>
                    <div className='flex items-center gap-1.5'>
                      <span className='text-xs font-420 capitalize opacity-50'>
                        {typeof option.small === 'function' ? option.small(profile, settings) : option.small}
                      </span>
                      <img src={icons.arrow_right} className='w-5 opacity-50 dark:invert' />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <Bottom />
    </div>
  );
}

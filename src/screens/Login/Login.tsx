import { useCallback, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import icons from '../../assets/icons/icons';
import images from '../../assets/images/images';
import Button from '../../components/Button';
import ReadPrivacyPolicyTerms from '../../components/Extras';
import { sendOTP } from '../../lib/api';
import transitions from '../../lib/transition';
import { blank_fn, delayFn, phoneNumberParser, phoneNumberValidation } from '../../lib/util';
import app from '../../../app';
import { usePopupAlertContext } from '../../context/PopupAlertContext';

const Login = () => {
  const navigate = useNavigate();
  const state = useLocation().state;
  const [error, setError] = useState('');
  const [phone, setPhone] = useState(state?.phone || '');
  const [sending, setSending] = useState(false);
  const { newPopup } = usePopupAlertContext();

  function handleInput(event: React.KeyboardEvent<HTMLInputElement>) {
    const target = event.target as HTMLInputElement;
    const value = target.value;
    if (value.length == 11) return;
    setPhone(phoneNumberParser(value));
  }

  const handleClick = (_: React.MouseEvent<HTMLInputElement>) => {
    handelOTPSend(phone);
  };

  const handelOTPSend = useCallback(
    async (phone: string) => {
      if (sending) return;
      const validation = phoneNumberValidation(phone);
      delayFn(async () => {
        if (validation.status) {
          // Set popup and ask for confirmation
          transitions(() =>
            newPopup({
              title: 'Confirm Phone Number',
              subTitle: (
                <p className='opacity-80'>
                  You entered <span className='text-blue-500'>{phone}</span>, Is this number ok, or would you like to
                  edit it?
                </p>
              ),
              action: [
                { text: 'Edit' },
                {
                  text: 'OK',
                  className: 'text-accent',
                  onClick: async () => {
                    setSending(true);
                    const otpStatus = await sendOTP(phone);
                    if (otpStatus.status) {
                      transitions(() => {
                        navigate('/otp', { replace: true, state: { phone: phone } });
                      })();
                    } else setError(otpStatus.message);
                  },
                },
              ],
            }),
          )();
        } else setError(validation.message);
        setSending(false);
      })();
    },
    [sending, navigate],
  );

  function handelKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    setError('');
    const target = event.target as HTMLInputElement;
    if (event.key === 'Enter') {
      handelOTPSend(target.value);
      // Blur the input field
      target.blur();
    }
  }

  return (
    <div className='screen flex flex-col items-center justify-between dark:bg-black'>
      <p></p>
      <div className='flex w-full flex-col gap-2'>
        <div className='flex w-full items-center justify-center pt-10'></div>
        <div className='logo-long text-center text-4xl font-semibold'>
          <p>Welcome to</p>
          <img src={images.logo_long} className='mx-auto w-60 pb-5 pt-5' />
        </div>
        <p className='text-center'>{app.loginDescription}</p>
      </div>

      <div className='mx-auto flex w-full max-w-lg flex-col gap-5'>
        <p className='normal-text text-center text-sm text-neutral-500 dark:text-neutral-400 dark:text-white/60'>
          Enter your <span className='text-accent'>Phone Number</span> to get started
        </p>
        <div>
          <div className='phone-number flex w-full items-center justify-center rounded-btn bg-inputBg pl-4 text-btn dark:bg-white/10'>
            <p className='pr-1'>+91</p>
            <div className=' darkL mx-2 h-[1.5em] w-0.5 rounded-full bg-neutral-300 dark:bg-white/10'></div>
            <input
              type='tel'
              className='w-full border-none bg-transparent p-4 pl-1 caret-accent outline-none'
              placeholder='xxxx xxx xxx'
              // maxLength={10}
              value={phone}
              onInput={handleInput}
              autoComplete='tel'
              onKeyDown={handelKeyDown}
            />
          </div>
          {error && <span className='pl-1.5 text-xs text-red-500'>{error}</span>}
        </div>

        {/* {
          // If user has referral code
          haveReferralCode && (
            <div className='flex w-full items-center justify-center gap-2 rounded-btn bg-inputBg pl-4 text-btn dark:bg-white/10'>
              <img src={icons.refer} className='mx-1 w-5 opacity-70 dark:invert' />
              <input
                type='text'
                className='w-full border-none bg-transparent p-4 pl-1 caret-accent outline-none'
                placeholder='Enter referral code'
              />
            </div>
          )
        }

        <label className='custom-checkbox pl-1'>
          <input type='checkbox' checked={!haveReferralCode} onChange={() => setHaveReferralCode(!haveReferralCode)} />
          <span className='checkmark'></span> I Have referral code
        </label> */}

        {sending ? (
          <div className='send-otp-button mt-4 flex animate-pulse items-center justify-center gap-3 p-[0.59rem] pr-5 text-sm'>
            <img src={icons.loading} className='w-5 dark:invert' />
            <p>Sending OTP</p>
          </div>
        ) : (
          <Button className='send-otp-button shine btn w-full' onClick={handleClick}>
            Send OTP
          </Button>
        )}
      </div>
      <ReadPrivacyPolicyTerms />
    </div>
  );
};

export default Login;

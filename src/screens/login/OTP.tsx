import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import images from '../../assets/images/images';
import { TextButton } from '../../components/Button';
import ReadPrivacyPolicyTerms from '../../components/Extras';
import transitions from '../../lib/transition';
import API, { apiResponse, checkOTP, resendOTP } from '../../lib/api';
import icons from '../../assets/icons/icons';
import ls from '../../lib/util';

type InputRef = React.MutableRefObject<HTMLInputElement>;

export default function OTP() {
  const navigate = useNavigate();
  const inputs: any = [useRef(), useRef(), useRef(), useRef(), useRef(), useRef()];
  const [isVerifying, setIsVerifying] = React.useState(false);
  const phone = useLocation().state?.phone;
  const [error, setError] = React.useState('');
  const [message, setMessage] = React.useState('');
  const [resendingOTP, setResendingOTP] = useState(false);

  async function resendOtp() {
    if (resendingOTP) return;
    setResendingOTP(true);
    setError('');
    setMessage('Sending OTP again...');
    const resendStatus = await resendOTP(phone);
    if (resendStatus.status === true) {
      setMessage('Sent OTP again');
      setError('');
    } else {
      setError(resendStatus.message);
      setMessage('');
    }
    setResendingOTP(false);
  }

  useEffect(() => {
    setTimeout(() => {
      inputs[0].current?.focus();
    }, 500);
  }, [inputs]);

  // useEffect(() => {
  // Disable back button
  // window.history.pushState(null, '', window.location.href);
  // window.onpopstate = () => {
  //   window.history.go(1);
  // };
  // console.log(window.history);
  // return () => {
  //   window.onpopstate = null;
  // };
  // }, []);

  async function verifyOtp() {
    if (isVerifying) return;
    // Disable all inputs
    inputs.forEach((r: InputRef) => (r.current.disabled = true));

    let otp = '';
    inputs.forEach((r: InputRef) => (otp += r.current.value));
    setIsVerifying(true);
    setError('');
    const otpStatus = await checkOTP(otp, phone);

    if (otpStatus.status) {
      const data = otpStatus.data;
      ls.set('token', data.token);
      ls.set('isLoggedIn', 'true');
      transitions(() => {
        navigate('/', { replace: true });
      })();
    } else {
      setError(otpStatus.message);
      inputs.forEach((r: InputRef) => {
        r.current.disabled = false;
        r.current.value = '';
      });
    }

    // setTimeout(() => {
    setIsVerifying(false);
    // }, 500);
  }

  function handelKeydown(event: React.KeyboardEvent<HTMLInputElement>, i: number) {
    // transitions(() => {
    event.preventDefault();
    const target = event.target as HTMLInputElement;
    if (event.key === 'ArrowLeft') i > 0 && inputs[i - 1].current?.focus();
    else if (event.key === 'ArrowRight') i < 5 && inputs[i + 1].current?.focus();
    else if (event.key === 'Backspace') {
      target.value = '';
      i > 0 && inputs[i - 1].current?.focus();
    } else if (!isNaN(Number(event.key))) {
      target.value = event.key;
      if (i == 5 && inputs.every((r: InputRef) => r.current.value)) verifyOtp();
      else i < 5 && inputs[i + 1].current?.focus();
    } else if (i == 5) if (event.key == 'Enter') verifyOtp();
    // })();
  }

  const editnumber = useCallback(() => {
    return transitions(() => {
      navigate('/login', {
        replace: true,
        state: {
          phone: phone,
        },
      });
    })();
  }, []);

  return (
    <div className='screen flex flex-col items-center justify-between'>
      <p></p>
      <div className='flex w-full flex-col gap-2'>
        <div className='flex w-full items-center justify-center pt-10'></div>
        <div className='logo-long text-center text-4xl font-semibold'>
          <p className='text-3xl'>Verify OTP</p>
          <img src={images.logo_long} className='mx-auto w-60 pb-5 pt-5' />
        </div>
      </div>
      <div>
        <p className='normal-text text-center text-sm text-gray-500 dark:text-gray-400 dark:text-white/60'>
          OTP sent to <span>+91 {phone}</span>. <TextButton onClick={editnumber}>Edit</TextButton>
        </p>
      </div>
      {error && (
        <div>
          <span className='pl-1.5 text-sm text-red-500'>{error}</span>
        </div>
      )}
      {message && (
        <div>
          <span className='pl-1.5 text-sm text-green-500'>{message}</span>
        </div>
      )}
      {isVerifying ? (
        <div className='send-otp-button flex animate-pulse items-center justify-center gap-3 pr-5 text-sm'>
          <img src={icons.loading} className='w-5 dark:invert' />
          <p>Verifying OTP</p>
        </div>
      ) : null}

      <div className='phone-number flex gap-2'>
        {inputs.map((r: any, i: number) => {
          return (
            <input
              type='number'
              ref={r}
              key={i}
              maxLength={1}
              onKeyDown={(event) => handelKeydown(event, i)}
              className='no-input-arrow aspect-[0.9] w-[3rem] appearance-none rounded-xl border-none bg-inputBg text-center caret-transparent outline-none outline-offset-0 transition-[outline-color] focus:outline-accent dark:bg-white/10'
            />
          );
        })}
      </div>
      <div>
        <p className='text-center text-sm'>
          Didn't receive OTP? <br />{' '}
          <TextButton onClick={resendOtp} moreClasses={resendingOTP ? 'animate-pulse' : ''}>
            Resend OTP
          </TextButton>
        </p>
      </div>
      <ReadPrivacyPolicyTerms />
    </div>
  );
}

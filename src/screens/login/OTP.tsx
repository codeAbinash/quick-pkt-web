import React, { useCallback, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import images from '../../assets/images/images';
import { TextButton } from '../../components/Button';
import ReadPrivacyPolicyTerms from '../../components/Extras';
import transitions from '../../lib/transition';
import ls from '../../lib/util';
// import { delay } from '@reduxjs/toolkit/dist/utils';

type InputRef = React.MutableRefObject<HTMLInputElement>;

export default function OTP() {
  const navigate = useNavigate();
  const inputs: any = [useRef(), useRef(), useRef(), useRef(), useRef(), useRef()];
  const [isVerifying, setIsVerifying] = React.useState(false);
  // Get phone number from navigate state
  const phone = useLocation().state?.phone;

  function resendOtp() {}

  useEffect(() => {
    setTimeout(() => {
      inputs[0].current.focus();
    }, 500);
  }, [inputs]);

  useEffect(() => {
    // Disable back button
    window.history.pushState(null, '', window.location.href);
    window.onpopstate = () => {
      window.history.go(1);
    };
    return () => {
      window.onpopstate = null;
    };
  }, []);

  async function verifyOtp() {
    if (isVerifying) return;
    // Disable all inputs
    inputs.forEach((r: InputRef) => (r.current.disabled = true));

    // Get otp
    let otp = '';
    inputs.forEach((r: InputRef) => (otp += r.current.value));
    console.log(otp);

    setTimeout(() => {
      alert('OTP verified');
      ls.set('isLoggedIn', 'true');
      navigate('/', { replace: true });
    }, 500);
  }

  function handelKeydown(event: React.KeyboardEvent<HTMLInputElement>, i: number) {
    // transitions(() => {
    event.preventDefault();
    const target = event.target as HTMLInputElement;
    if (event.key === 'ArrowLeft') i > 0 && inputs[i - 1].current.focus();
    else if (event.key === 'ArrowRight') i < 5 && inputs[i + 1].current.focus();
    else if (event.key === 'Backspace') {
      target.value = '';
      i > 0 && inputs[i - 1].current.focus();
    } else if (!isNaN(Number(event.key))) {
      target.value = event.key;
      if (i == 5 && inputs.every((r: InputRef) => r.current.value)) verifyOtp();
      else i < 5 && inputs[i + 1].current.focus();
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
          Didn't receive OTP? <br /> <TextButton onClick={resendOtp}>Resend OTP</TextButton>
        </p>
      </div>
      <ReadPrivacyPolicyTerms />
    </div>
  );
}

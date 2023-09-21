import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import icons from '../../assets/icons/icons';
import images from '../../assets/images/images';
import { TextButton } from '../../components/Button';
import ReadPrivacyPolicyTerms from '../../components/Extras';
import { checkOTP, resendOTP } from '../../lib/api';
import transitions from '../../lib/transition';
import ls from '../../lib/util';
type InputRef = React.MutableRefObject<HTMLInputElement>;

function getNextOTPSentTimeLs() {
  if (ls.get('NextOTPSentTime')) return Number(ls.get('NextOTPSentTime'));
  else return setNextOTPSentTimeLs();
}
function setNextOTPSentTimeLs() {
  const now = Date.now() + 2 * 60 * 1000;
  ls.set('NextOTPSentTime', now.toString());
  return now;
}

export default function OTP() {
  const navigate = useNavigate();
  const [nextOTPSentTime, setnextOTPSentTime] = useState(useMemo(() => getNextOTPSentTimeLs(), []));
  const inputs: any = [useRef(), useRef(), useRef(), useRef(), useRef(), useRef()];
  const [isVerifying, setIsVerifying] = React.useState(false);
  const phone = useLocation().state?.phone;
  const [error, setError] = React.useState('');
  const [message, setMessage] = React.useState('');
  const [now, setNow] = useState(Date.now());
  const [resendingOTP, setResendingOTP] = useState(false);

  const resendOtp = useCallback(async () => {
    if (resendingOTP) return;
    setResendingOTP(true);
    setError('');
    setMessage('Sending OTP again...');
    const resendStatus = await resendOTP(phone);
    if (resendStatus.status === true) {
      setMessage('Sent OTP again');
      setError('');
      setnextOTPSentTime(setNextOTPSentTimeLs());
    } else {
      setError(resendStatus.message);
      setMessage('');
    }
    setResendingOTP(false);
  }, [phone, resendingOTP]);

  const verifyOtp = useCallback(async () => {
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
      setMessage('');
      inputs.forEach((r: InputRef) => {
        r.current.disabled = false;
        r.current.value = '';
      });
    }

    // setTimeout(() => {
    setIsVerifying(false);
    // }, 500);
  }, [inputs, isVerifying, phone]);

  const handelKeydown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>, i: number) => {
      event.preventDefault();
      const target = event.target as HTMLInputElement;
      if (event.key === 'ArrowLeft') i > 0 && inputs[i - 1].current?.focus();
      else if (event.key === 'ArrowRight') i < 5 && inputs[i + 1].current?.focus();
      else if (event.key === 'Escape') inputs[i].current?.blur();
      else if (event.key === 'Backspace') {
        target.value = '';
        i > 0 && inputs[i - 1].current?.focus();
      } else if (!isNaN(Number(event.key))) {
        target.value = event.key;
        if (i == 5 && inputs.every((r: InputRef) => r.current.value)) verifyOtp();
        else i < 5 && inputs[i + 1].current?.focus();
      } else if (i == 5) if (event.key == 'Enter') verifyOtp();
    },
    [inputs, verifyOtp],
  );

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

  useEffect(() => {
    const timer = setTimeout(() => inputs[0].current?.focus(), 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(interval);
  }, []);

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
          <p className='pl-1.5 text-center text-sm text-red-500'>{error}</p>
        </div>
      )}
      {message && (
        <div>
          <p className='pl-1.5 text-center text-sm text-green-500'>{message}</p>
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
              className='no-input-arrow aspect-[0.9] w-[2.6rem] appearance-none rounded-xl border-none bg-inputBg text-center caret-transparent outline-none outline-offset-0 transition-[outline-color] focus:outline-accent dark:bg-white/10'
            />
          );
        })}
      </div>
      <div>
        <p className='text-center text-sm'>
          Didn't receive OTP? <br />{' '}
          <TextButton
            onClick={resendOtp}
            moreClasses={resendingOTP ? 'animate-pulse' : ''}
            disabled={!isAbaleToResendOTP(now, nextOTPSentTime)}
          >
            Resend OTP {getTimeRemaining(now, nextOTPSentTime)}
          </TextButton>
        </p>
      </div>
      <ReadPrivacyPolicyTerms />
    </div>
  );
}

function isAbaleToResendOTP(now: number, otpSentTime: number) {
  return now + 1000 > otpSentTime;
}

function getTimeRemaining(d1: any, d2: any) {
  if (isAbaleToResendOTP(d1, d2)) return;
  const diff = d2 - d1;
  const minutes = Math.floor(diff / 1000 / 60);
  const seconds = Math.floor((diff / 1000) % 60);
  return `in ${minutes}:` + seconds.toString().padStart(2, '0');
}

import { useCallback, useEffect } from 'react';
import { usePopupAlertContext } from '../context/PopupAlertContext';

export default function PopupAlert() {
  const { popups, setPopups } = usePopupAlertContext();

  useEffect(() => {
    if (popups.length) document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [popups]);

  // Disable back button
  useEffect(() => {
    const disableBackButton = (e: any) => {
      e.preventDefault();
      e.stopPropagation();
    };
    window.addEventListener('popstate', disableBackButton);
    return () => {
      window.removeEventListener('popstate', disableBackButton);
    };
  }, [popups]);

  // Remove the last popup
  const removePopup = useCallback(() => {
    const old = [...popups];
    old.pop();
    setPopups(old);
  }, [popups]);

  const popup = popups[popups.length - 1];

  if (!popups.length) return null;
  return (
    <div className='50 fixed z-[100] flex h-screen w-full select-none items-center justify-center'>
      {/* {popups.map((popup, index) => ( */}
      <div
        // key={index}
        className='w-[85%] rounded-3xl bg-white/70 shadow-[0px_0px_100vh_100dvh_#00000010] backdrop-blur-xl dark:bg-black/70'
      >
        <div className='p-6 pb-3'>
          <p className='text-lg font-normMid'>{popup.title}</p>
          <p className='mt-2 text-sm'>{popup.subTitle}</p>
        </div>
        <div className='flex items-center justify-between gap-2 p-3.5 pb-5 pt-0 text-sm'>
          {popup.action.map((action, index) => (
            <button
              key={index}
              className={
                action.className +
                ' highlight-none tap95 w-full flex-grow rounded-lg py-3 font-normMid active:bg-inputBg active:dark:bg-white/10'
              }
              onClick={() => {
                removePopup();
                action.onclick();
              }}
            >
              {action.text}
            </button>
          ))}
        </div>
      </div>
      {/* ))} */}
    </div>
  );
}

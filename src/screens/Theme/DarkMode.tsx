import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { setTheme } from '../../Redux/settings';
import store from '../../Redux/store';
import { Header } from '../../components/Header/Header';
import TapMotion from '../../components/TapMotion';
import { applyThemeLs } from '../../lib/theme';
import transitions from '../../lib/transition';

function getThemeDescription(theme: string) {
  switch (theme) {
    case 'light':
      return 'Classic and clean';
    case 'dark':
      return 'Dark and mysterious';
    case 'auto':
      return 'Dynamic Theme Switching';
  }
}

export default function DarkMode() {
  const currentTheme = useSelector((state: any) => state.settings.theme);

  const darkMode = useCallback(() => {
    store.dispatch(setTheme('dark'));
    applyThemeLs('dark');
  }, []);

  const lightMode = useCallback(() => {
    store.dispatch(setTheme('light'));
    applyThemeLs('light');
  }, []);

  const autoMode = useCallback(() => {
    store.dispatch(setTheme('auto'));
    applyThemeLs('auto');
  }, []);

  return (
    <div className='colors min-h-[100dvh] select-none'>
      <Header>
        <span className='text-normMid'>
          <span className='font-normMid'>Dark Mode</span>
        </span>
      </Header>
      <div className='p-5'>
        <div className='to my-5 mb-10 flex flex-col items-center justify-center rounded-3xl bg-gradient-radial py-20 dark:bg-gradient-radial-dark'>
          <p className='text-2xl font-medium capitalize'>{currentTheme} Mode</p>
          <p className='text-sm'>{getThemeDescription(currentTheme)}</p>
        </div>

        <div className='mx-auto max-w-sm'>
          <div className='grid grid-cols-3 gap-2.5'>
            <TapMotion
              onClick={transitions(lightMode, 0)}
              className={`${currentTheme === 'light' ? 'outline outline-accent' : ''}
              flex aspect-[4/3] items-end justify-end rounded-btn border border-neutral-300 bg-neutral-100 transition-[outline]`}
            >
              <div className='h-4/5 w-4/5 rounded-br-btn rounded-tl-btn border border-neutral-300 border-b-transparent border-r-transparent  bg-white'>
                <div className='p-3 pl-4'>
                  <span className='font-normMid text-black'>Aa</span>
                </div>
              </div>
            </TapMotion>
            <TapMotion
              onClick={transitions(darkMode, 0)}
              className={`${currentTheme === 'dark' ? 'outline outline-accent' : ''} 
              flex aspect-[4/3] items-end justify-end rounded-btn border border-neutral-700 bg-neutral-900 transition-[outline]`}
            >
              <div className='h-4/5 w-4/5 rounded-br-btn rounded-tl-btn border border-neutral-700 border-b-transparent border-r-transparent bg-black'>
                <div className='p-3 pl-4'>
                  <span className='font-normMid text-white'>Aa</span>
                </div>
              </div>
            </TapMotion>
            <TapMotion
              onClick={transitions(autoMode, 0)}
              className={`${currentTheme === 'auto' ? 'outline outline-accent' : ''}
              relative flex aspect-[4/3] justify-end overflow-hidden rounded-btn transition-[outline]`}
            >
              <div className='relative flex h-full w-full items-end justify-end overflow-hidden rounded-btn border border-neutral-300 bg-neutral-100'>
                <div className='h-4/5 w-4/5 rounded-br-btn rounded-tl-btn border border-neutral-300 border-b-transparent border-r-transparent  bg-white'>
                  <div className='rounded-btn bg-white p-3 pl-4'>
                    <span className='font-normMid text-black'>Aa</span>
                  </div>
                </div>
              </div>
              <div className='absolute h-full w-[55%] rounded-r-btn backdrop-invert'></div>
            </TapMotion>
          </div>
          <div className='mt-2.5 grid grid-cols-3 gap-2.5 text-center text-xs font-normMid'>
            <span className={`${currentTheme === 'light' ? 'text-accent' : ''} transition-colors`}>Light</span>
            <span className={`${currentTheme === 'dark' ? 'text-accent' : ''} transition-colors`}>Dark</span>
            <span className={`${currentTheme === 'auto' ? 'text-accent' : ''} transition-colors`}>Auto</span>
          </div>
        </div>
      </div>
    </div>
  );
}

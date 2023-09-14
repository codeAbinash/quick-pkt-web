import { flushSync } from 'react-dom';
import { CLICK_DELAY } from '../constant';

export default function transitions(callback: Function, delay = CLICK_DELAY) {
  // @ts-ignore
  if (!document.startViewTransition) {
    return function () {
      setTimeout(callback, delay);
    };
  }

  return function () {
    setTimeout(() => {
      // @ts-ignore
      document.startViewTransition(() => {
        flushSync(() => callback());
      });
    }, delay);
  };
}

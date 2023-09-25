import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import headerIntersect from '../../lib/headerIntersect';
import { blank_fn } from '../../lib/util';
import icons from '../../assets/icons/icons';

export function Header({ children, onclick = blank_fn }: { children?: React.ReactNode; onclick?: Function }) {
  const intersect = useRef<HTMLParagraphElement>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    headerIntersect(intersect.current as Element, setIsIntersecting);
  }, []);
  return (
    <>
      <p ref={intersect}></p>
      <div
        className={`sticky top-0 z-40 flex w-full items-center gap-2 bg-white/80 px-3 py-1.5 backdrop-blur-md dark:bg-black dark:bg-black/70 ${
          isIntersecting ? '' : 'shadow-sm shadow-[#00000015] dark:shadow-[#ffffff15]'
        }`}
      >
        <div
          className='tap95 rounded-full p-2.5 active:bg-inputBg active:dark:bg-white/20'
          onClick={() => {
            if (onclick == blank_fn) navigate(-1);
            onclick();
          }}
        >
          <img src={icons.back} alt='Back' className='aspect-square w-[1.65rem] dark:invert' />
        </div>
        <div>{children}</div>
      </div>
    </>
  );
}

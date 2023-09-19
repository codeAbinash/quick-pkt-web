import { motion } from 'framer-motion';
import React, { forwardRef } from 'react';
import { useNavigate } from 'react-router-dom';
import transitions from '../lib/transition';
import { blank_fn } from '../lib/util';

type ButtonProps = {
  children: React.ReactNode;
  className?: string;
  to?: string;
  disabled?: boolean;
  onClick?: Function;
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const { children, className, to, onClick, disabled, ...rest } = props;
  const navigate = useNavigate();

  return (
    <motion.button
      className={className}
      whileTap={{ scale: 0.98 }}
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 400 }}
      onClick={() => {
        if (to) {
          transitions(() => {
            navigate(to);
          })();
        }
        if (onClick) {
          onClick();
        }
      }}
      ref={ref}
      disabled={disabled}
      {...rest}
    >
      {children}
    </motion.button>
  );
});

type TextButtonProps = {
  children: React.ReactNode;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  moreClasses?: string;
};
export function TextButton({
  children,
  className = 'highlight-none rounded-md p-0.5 px-1 text-accent transition-colors active:bg-accent/10 dark:active:bg-accent/20',
  onClick = blank_fn,
  moreClasses = '',
  ...rest
}: TextButtonProps) {
  console.log(rest);
  return (
    <button onClick={onClick} className={className + ' ' + moreClasses} {...rest}>
      {children}
    </button>
  );
}

export default Button;

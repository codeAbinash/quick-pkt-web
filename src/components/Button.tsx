import { motion } from 'framer-motion';
import { forwardRef } from 'react';
import { useNavigate } from 'react-router-dom';
import transitions from '../lib/transition';

type ButtonProps = {
  children: React.ReactNode;
  className?: string;
  to?: string;
  onClick?: () => void;
};

const Button = forwardRef<HTMLDivElement, ButtonProps>((props, ref) => {
  const { children, className, to, onClick, ...rest } = props;
  const navigate = useNavigate();

  return (
    <motion.div
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
      {...rest}
    >
      {children}
    </motion.div>
  );
});

export default Button;

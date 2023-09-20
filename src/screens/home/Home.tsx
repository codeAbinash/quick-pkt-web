import { useEffect, useMemo } from 'react';
import ls from '../../lib/util';
import { useNavigate } from 'react-router-dom';

function getLoginStatus() {
  return ls.get('isLoggedIn');
}

export default function Home() {
  // Check If it is logged in
  const isLoggedIn = useMemo(() => getLoginStatus(), []);
  const navigate = useNavigate();
  useEffect(() => {
    if (!isLoggedIn)
      navigate('/login', {
        replace: true,
      });
  }, []);
  useEffect(() => {}, []);

  return (
    <div className='screen flex items-center justify-center text-center'>
      Home Screen <br /> Under Development
    </div>
  );
}

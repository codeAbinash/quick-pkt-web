import { useEffect, useMemo } from 'react';
import ls, { blank_fn } from '../../lib/util';
import { useNavigate } from 'react-router-dom';
import { TextButton } from '../../components/Button';

function getLoginStatus() {
  return ls.get('isLoggedIn');
}

function logout() {
  ls.clear();
  window.location.reload();
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
    <div className='screen flex flex-col items-center justify-center gap-10 text-center'>
      <div>
        Home Screen <br /> Under Development
      </div>
      <TextButton onClick={blank_fn}>Log Out</TextButton>
    </div>
  );
}

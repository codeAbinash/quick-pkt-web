import Button from '../../components/Button';
import { Header } from '../../components/Header/Header';
import { logOutUser } from '../../lib/api';
import ls from '../../lib/util';

async function logout() {
  return;
  const logoutStatus = await logOutUser();
  if (logoutStatus) {
    ls.clear();
    window.location.reload();
  } else {
    alert('Something went wrong. Please try again.');
  }
}

export default function LogOut() {
  return (
    <div>
      <Header>
        <span className='font-normMid'>Log Out</span>
      </Header>
      <div className='mt-5 flex min-h-[50vh] items-center justify-center'>
        <div className='mt-5 flex w-full flex-col items-center justify-center gap-5 p-5'>
          <p className='text-sm font-normMid text-neutral-500'>Are you sure you want to log out?</p>
          <Button className='btn w-full flex-grow' onClick={logout}>
            Log Out
          </Button>
        </div>
      </div>
    </div>
  );
}

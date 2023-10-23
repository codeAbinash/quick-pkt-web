import Button from '../../../components/Button';
import { Header } from '../../../components/Header/Header';

export default function ConfirmRecharge() {
  return (
    <div className='flex min-h-[100dvh] flex-col justify-between'>
      <div>
        <Header>
          <span className='font-normMid'>Payment Amount ₹499</span>
        </Header>
      </div>
      <div className='p-5'>
        <Button className='btn w-full'>
          <span className='text-sm font-normMid'>Pay ₹499 via UPI</span>
        </Button>
      </div>
    </div>
  );
}

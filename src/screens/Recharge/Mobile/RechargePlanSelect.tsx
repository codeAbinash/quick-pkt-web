import { useNavigate, useSearchParams } from 'react-router-dom';
import { Header } from '../../../components/Header/Header';

export default function RechargePlanSelect() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const phone = params.get('phone');
  const nickname = params.get('nickname');
  const type = params.get('type');
  const provider = params.get('provider');

  function edit() {
    navigate(`/recharge/mobile/number_select?phone=${phone}&nickname=${nickname}&type=${type}&provider=${provider}`, {
      replace: true,
    });
  }

  return (
    <div className='colors'>
      <Header onclick={edit}>
        <span className='font-normMid'>Select Plan</span>
      </Header>
      <div>
        <h1>{phone + ' ' + nickname + ' ' + type + ' ' + provider}</h1>
        <p className='text-accent' onClick={edit}>
          Edit?
        </p>
      </div>
    </div>
  );
}

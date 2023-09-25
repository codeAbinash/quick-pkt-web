import { useEffect, useState } from 'react';

import { Header } from '../../components/Header/Header';
// import sample from './sample.txt';
import { privacy_policy } from '../../lib/api';
import { Bottom } from '../../components/Extras';
import icons from '../../assets/icons/icons';

async function getPrivacy() {
  const response = await privacy_policy();
  console.log(response.data.data);
  return response.data.data;
}

function Loading() {
  return (
    <div className='flex min-h-[70dvh] items-center justify-center'>
      <img src={icons.loading} alt='Loading' className='w-10 dark:invert' />
    </div>
  );
}
export default function Privacy() {
  const [htmlData, setHtmlData] = useState<null | string>(null);
  useEffect(() => {
    try {
      getPrivacy().then((data) => {
        setHtmlData(data);
      });
    } catch (err) {
      alert(err);
    }
    // console.log(sample);
    // fetch(sample)
    //   .then((r) => r.text())
    //   .then((text) => {
    //     console.log(text);
    //     setHtmlData(text as string);
    //   });
  }, []);
  return (
    <div>
      <Header>
        <span className='font-normMid'>Privacy Policy</span>
      </Header>
      <p className='text-2xl'></p>
      {htmlData === null ? (
        <Loading />
      ) : (
        <div
          className='flex flex-col justify-center gap-4 p-5 pt-2 text-sm font-normal'
          dangerouslySetInnerHTML={{ __html: htmlData }}
        />
      )}
      <Bottom />
    </div>
  );
}

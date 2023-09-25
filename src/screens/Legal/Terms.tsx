import { useEffect, useState } from 'react';
import { Header } from '../../components/Header/Header';
// import sample from './sample.txt';
import icons from '../../assets/icons/icons';
import { Bottom } from '../../components/Extras';
import { terms_and_conditions } from '../../lib/api';

async function getTermsAndConditions() {
  const response = await terms_and_conditions();
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
      getTermsAndConditions().then((data) => {
        setHtmlData(data);
      });
    } catch (err) {
      console.log(err);
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
        <span className='font-normMid'>Terms and Conditions</span>
      </Header>
      <p className='text-2xl'></p>
      {htmlData === null ? (
        <Loading />
      ) : (
        <div
          className='flex flex-col justify-center gap-4 p-5 pt-2 text-sm'
          dangerouslySetInnerHTML={{ __html: htmlData }}
        />
      )}
      <Bottom />
    </div>
  );
}

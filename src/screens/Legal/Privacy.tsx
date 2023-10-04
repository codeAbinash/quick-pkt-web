import { useEffect, useState } from 'react';

import { Header } from '../../components/Header/Header';
// import sample from './sample.txt';
import { Watermark } from '../../components/Extras';
import { privacy_policy } from '../../lib/api';
import LoadingHtmlPage from './components/LoadingHtmlPage';

async function getPrivacy() {
  const response = await privacy_policy();
  console.log(response.data.data);
  return response.data.data;
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
        <LoadingHtmlPage />
      ) : (
        <>
          <div
            className='terms_and_conditions flex flex-col justify-center p-5 pt-2 text-sm font-normal'
            dangerouslySetInnerHTML={{ __html: htmlData }}
          />
          <Watermark />
        </>
      )}
    </div>
  );
}

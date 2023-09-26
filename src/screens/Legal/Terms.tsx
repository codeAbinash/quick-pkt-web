import { useEffect, useState } from 'react';
import { Header } from '../../components/Header/Header';
// import sample from './sample.txt';
import { Bottom } from '../../components/Extras';
import { terms_and_conditions } from '../../lib/api';
import LoadingHtmlPage from './components/LoadingHtmlPage';

async function getTermsAndConditions() {
  const response = await terms_and_conditions();
  console.log(response.data.data);
  return response.data.data;
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
        <LoadingHtmlPage />
      ) : (
        <>
          <div
            className='terms_and_conditions flex flex-col justify-center p-5 pt-2 text-sm'
            dangerouslySetInnerHTML={{ __html: htmlData }}
          />
          <Bottom />
        </>
      )}
    </div>
  );
}

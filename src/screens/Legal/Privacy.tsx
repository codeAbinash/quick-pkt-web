import { useEffect, useState } from 'react';

import { Header } from '../../components/Header/Header';
import sample from './sample.txt';

export default function Privacy() {
  const [htmlData, setHtmlData] = useState('<div className="text-center">Loading...</div>');
  useEffect(() => {
    fetch(sample)
      .then((r) => r.text())
      .then((text) => {
        console.log(text);
        setHtmlData(text as any);
      });
  }, []);
  return (
    <div>
      <Header>
        <span className='font-normMid'>Privacy Policy</span>
      </Header>
      <div className=' px-5'>
        <div dangerouslySetInnerHTML={{ __html: htmlData }} />
      </div>
    </div>
  );
}

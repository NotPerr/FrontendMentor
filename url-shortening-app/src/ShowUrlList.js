import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useState } from 'react';
import './index.css'


export default function ShowUrlList({ urlList }) {
    const [copiedIndex, setCopiedIndex] = useState(-1);
  
    const handleCopy = (index) => {
      setCopiedIndex(index);
    };
  
    if (urlList.length >= 1) {
      const reversedUrlList = [...urlList].reverse();
      

      return reversedUrlList.map((url, index) => (
        <div key={url.code} className='bg-white mb-4 px-3 rounded'>
            <div className='py-2 border-b '>
                <p className='truncate' >{url.original_link}</p>
            </div>
          <div className='py-2 text-cyan '>
            {url.full_short_link}
          </div>
          <CopyToClipboard text={url.full_short_link}>
            <button onClick={() => handleCopy(index)} className='bg-cyan text-white w-full mb-4 py-2 rounded'>
              {copiedIndex === index ? 'Copied' : 'Copy'}
            </button>
          </CopyToClipboard>
        </div>
      ));
    } else {
      return null;
    }
  }
  
  
  
  
  
  
  
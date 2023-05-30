import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useState } from 'react';


export default function ShowUrlList({ urlList }) {
    const [copiedIndex, setCopiedIndex] = useState(-1);
  
    const handleCopy = (index) => {
      setCopiedIndex(index);
    };
  
    if (urlList.length >= 1) {
      const reversedUrlList = [...urlList].reverse();

      return reversedUrlList.map((url, index) => (
        <div key={url.code}>
          <div>
            {url.original_link} <br />
            {url.full_short_link}
          </div>
          <CopyToClipboard text={url.full_short_link}>
            <button onClick={() => handleCopy(index)}>
              {copiedIndex === index ? 'Copied' : 'Copy'}
            </button>
          </CopyToClipboard>
        </div>
      ));
    } else {
      return null;
    }
  }
  
  
  
  
  
  
  
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useState } from 'react';
import './index.css'


export default function ShowUrlList({ urlList }) {

    const initialCopiedIndex = -1;
    const [copiedIndex, setCopiedIndex] = useState(initialCopiedIndex);

    const handleCopy = (reversedIndex) => {
        const originalIndex = urlList.length - 1 - reversedIndex;
        setCopiedIndex((prevIndex) => (prevIndex === originalIndex ? initialCopiedIndex : originalIndex));
    };
  
    if (urlList.length >= 1) {
      const reversedUrlList = [...urlList].reverse();
    
      

      return reversedUrlList.map((url, reversedIndex) => (
        <div key={url.code} className='bg-white mb-4 px-3 rounded md:flex justify-between'>
            <div className='py-2 border-b w-72'>
                <p className='truncate md:my-2' >{url.original_link}</p>
            </div>
            <div className='md:flex items-center'>
                <div className='py-2 text-cyan md:pr-4'>
                {url.full_short_link}
                </div>
                <CopyToClipboard text={url.full_short_link}>
                    <button onClick={() => handleCopy(reversedIndex)} 
                    className={`text-white w-full mb-4 py-2 rounded md:w-24 md:my-2
                    ${copiedIndex === urlList.length - 1 - reversedIndex ? 'bg-violet' : 'bg-cyan'}`}>

                    {copiedIndex === urlList.length - 1 - reversedIndex ? 'Copied!' : 'Copy'}
                    </button>
                </CopyToClipboard>
            </div>
          
        </div>
      ));
    } else {
      return null;
    }
  }
  
  
  
  
  
  
  
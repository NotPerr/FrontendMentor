import { CopyToClipboard } from 'react-copy-to-clipboard';


export default function ShowUrlList({urlList}) {
    if(urlList.length >= 1) {
        console.log("render old url")
        return urlList.map(url =>
          <div key={url.code}>
            <div>
              {url.original_link} <br />
              {url.full_short_link}
            </div>
            <CopyToClipboard text={url.full_short_link}>
              <button>
                Copy
              </button>
            </CopyToClipboard>
          </div>
        );
      }else {
        return
      }
}
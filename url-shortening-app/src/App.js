import { useState } from 'react';
import axios from 'axios';
import './App.css';
import {CopyToClipboard} from 'react-copy-to-clipboard';

function App() {

  const [userInput, setUserInput] = useState("");
  const [shortenedLink, setShortenedLink] = useState({});

  const fetchData = async () => {
    try {
      const response = await axios(
        `https://api.shrtco.de/v2/shorten?url=${userInput}`
      );
      setShortenedLink(response.data.result);
    } catch (e) {
      console.log(e);
    }
  };


  return (
    <div className="App">
      <header className="App-header">
        header
        <nav className='mobile-nav'>mobile nav</nav>
      </header>

      <section className='banner'>banner</section>

      <section className='url-input'>
        <input
              
              type="text"
              placeholder="Shorten a link here..."
              value={userInput}
              onChange={(e) => {setUserInput(e.target.value)}}
        />
        <button onClick={fetchData}>Shorten It!</button>
      </section>

      <section className='shorten-url'>
        <div>
          {shortenedLink.original_link} <br/> 
          {/* delete it later */}

          {shortenedLink.full_share_link}
        </div>
        <CopyToClipboard text={shortenedLink}>
          <button>
            Copy
          </button>
        </CopyToClipboard>
        
      </section>

      <section className='info'>info</section>

      <section className='start'>start</section>

      <footer>footer</footer>


    </div>
  );
}

export default App;

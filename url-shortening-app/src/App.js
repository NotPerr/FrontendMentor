import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import ShowUrlList from './ShowUrlList';

function App() {

  const [userInput, setUserInput] = useState("");
 
  const [urlList, setUrlList] = useState([]);
  useEffect(() => {
    const storedArray = localStorage.getItem('urlList');
    if (storedArray) {
      setUrlList(JSON.parse(storedArray));
    }
  }, []);
  

  const fetchData = async () => {
    try {
      const response = await axios(
        `https://api.shrtco.de/v2/shorten?url=${userInput}`
      );
      const newShortenedLink = response.data.result;
      const newArr = [...urlList, newShortenedLink];
      setUrlList(newArr);
      
    } catch (e) {
      console.log(e);
    }
  };


  useEffect(() => {
    if(urlList.length >= 1) {
      localStorage.setItem("urlList", JSON.stringify(urlList));
    }
    
  }, [urlList]);



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
          onChange={(e) => { setUserInput(e.target.value) }}
        />
        <button onClick={fetchData}>Shorten It!</button>
      </section>

      <section className='shorten-url'>

        <ShowUrlList urlList={urlList} />

      </section>

      <section className='info'>info</section>

      <section className='start'>start</section>

      <footer>footer</footer>


    </div>
  );
}

export default App;

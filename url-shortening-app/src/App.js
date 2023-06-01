import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import './index.css'
import ShowUrlList from './ShowUrlList';
import { ReactSVG } from 'react-svg';
import  Logo  from './images/logo.svg';
import bannerImg from './images/illustration-working.svg'



function App() {

  const [userInput, setUserInput] = useState("");

  const [urlList, setUrlList] = useState([]);
  useEffect(() => {
    const storedArray = localStorage.getItem('urlList');
    if (storedArray) {
      setUrlList(JSON.parse(storedArray));
    }
  }, []);

  const [isInvalid, setIsInvalid] = useState(false);


  const fetchData = async () => {
    if (!isValidLink(userInput)) {
      console.log("Invalid link");
      setIsInvalid(true);
      return;
    }
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

  const isValidLink = (link) => {
    const urlPattern = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
    return urlPattern.test(link);
  };


  useEffect(() => {
    if (urlList.length >= 1) {
      localStorage.setItem("urlList", JSON.stringify(urlList));
    }

  }, [urlList]);



  return (
    <div className="App font-poppins font-medium  w-full ">
      <div className=' '>
        <header className="App-header flex flex-row justify-between mt-5 mx-5">
          <ReactSVG src={Logo} />
          <nav className='mobile-nav'>mobile nav</nav>
        </header>

        <section className='banner mt-4 '>
          <div className='relative h-64'>
            <img src={bannerImg} alt='banner image' className='w-full absolute -right-16'/>
          </div>
          
          <h1 className='text-4xl font-bold text-center'>More than just shorter links</h1>
        </section>

        <section className='url-input mx-5'>
          <input

            type="text"
            placeholder="Shorten a link here..."
            value={userInput}
            onChange={(e) => { setUserInput(e.target.value) }}
          />
          {isInvalid ? <span>Please add a link</span> : null}
          <button onClick={fetchData}>Shorten It!</button>
        </section>

        <section className='shorten-url w-full'>

          <ShowUrlList urlList={urlList} />

        </section>

        <section className='info'>info</section>
      </div>


      <section className='start'>start</section>

      <footer>footer</footer>


    </div>
  );
}

export default App;

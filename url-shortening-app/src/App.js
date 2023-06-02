import { useState, useEffect } from 'react';
import axios from 'axios';
import './index.css'
import ShowUrlList from './ShowUrlList';
import { ReactSVG } from 'react-svg';
import Logo from './images/logo.svg';




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

      <header className="App-header flex flex-row justify-between mt-5 mx-5">
        <ReactSVG src={Logo} />
        <nav className='mobile-nav'>mobile nav</nav>
      </header>

      <div className='relative flex flex-col'>
        {/* banner section */}
        <section className='banner mt-4 items-center pb-28'>
          <div className='h-72 w-full banner-bg'>

          </div>
          <div className='flex flex-col items-center'>
            <h1 className='text-4xl font-bold text-center'>More than just shorter links</h1>

            <p className='text-center font-medium text-grayViolet mt-4'>
              Build your brand’s recognition and get detailed insights
              on how your links are performing.
            </p>

            <button className='mt-6  bg-cyan text-white w-40 h-11 rounded-full'>Get Started</button>
          </div>

        </section>
        {/* input section */}
        <section className='url-input px-5 absolute -bottom-24 w-full'>
          <div className='input-bg flex flex-col items-center py-4 px-4 rounded-lg'>
            <input
              className={`w-full py-2 pl-2.5 rounded  ${isInvalid ? 'border-red-500 border-2 placeholder:text-red invalid-input' : 'border-0'}`}
              type="text"
              placeholder="Shorten a link here..."
              value={userInput}
              onChange={(e) => { setUserInput(e.target.value) }}
            />
            {isInvalid ? <div className='w-full text-red-400 text-xs mt-1'>Please add a link</div> : null}
            <button className='bg-cyan text-white w-full h-11 mt-3.5 rounded' onClick={fetchData}>Shorten It!</button>
          </div>

        </section>
      </div>


      <section className='shorten-url w-full bg-bgGray pt-44'>

        <ShowUrlList urlList={urlList} />

      </section>

      <section className='info'>info</section>



      <section className='boost'>boost</section>

      <footer>footer</footer>


    </div>
  );
}

export default App;

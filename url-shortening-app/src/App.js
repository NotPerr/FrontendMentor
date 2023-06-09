import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './index.css'
import ShowUrlList from './ShowUrlList';
import { ReactSVG } from 'react-svg';
import Logo from './images/logo.svg';
import Brand from './images/icon-brand-recognition.svg';
import Detail from './images/icon-detailed-records.svg';
import Customize from './images/icon-fully-customizable.svg';
import FooterLogo from './images/footer-logo.svg';
import Facebook from './images/icon-facebook.svg';
import Twitter from './images/icon-twitter.svg';
import Pinterest from './images/icon-pinterest.svg';
import Instagram from './images/icon-instagram.svg';
import Menu from './images/menu.svg';
import './function.js';





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
      setIsInvalid(false);
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

      <header className="App-header flex mt-5 mx-5 md:mx-7 justify-between content-center flex-wrap relative
      lg:mx-10">
        <ReactSVG src={Logo} className='flex flex-col justify-center'/>
        <img id='toggle-menu' src={Menu} alt='menu' className='w-7 md:hidden' />
        {/* mobile nav */}
        <nav  id='mobile-nav' className='slide mobile-nav-hide absolute bg-violet text-white w-full z-50 px-3 rounded-lg'>
          <ul className='text-center my-8 border-b-[0.5px] border-grayViolet'>
            <li className='mb-6'><a href='#'>Features</a></li>
            <li className='mb-6'><a href='#'>Pricing</a></li>
            <li className='mb-6'><a href='#'>Resources</a></li>
          </ul>
          <button className='w-full'>Login</button>
          <button className='w-full bg-cyan text-white rounded-full py-3 my-6'>Sign Up</button>
        </nav>

        {/* desktop nav */}
        <nav className='desktop-nav z-50 px-3  flex hidden md:block grow'>
          <div className='flex justify-between w-full'>
            <div>
              <ul className='text-center my-8 flex text-grayViolet ml-2'>
                <li className='mr-4 hover:text-darkViolet slide'><a href='#'>Features</a></li>
                <li className='mr-4 hover:text-darkViolet slide'><a href='#'>Pricing</a></li>
                <li className='hover:text-darkViolet slide'><a href='#'>Resources</a></li>
              </ul>
            </div>
            
            <div className='flex justify-center items-center'>
              <button className='px-4'>Login</button>
              <button className=' px-5 bg-cyan text-white rounded-full h-9 hover:bg-cyanHover slide'>Sign Up</button>
            </div>
            
          </div>
          
        </nav>
      </header>

      <div className='relative flex flex-col '>
        {/* banner section */}
        <section className='banner mt-4 items-center pb-28 md:flex md:flex-row-reverse md:ml-7 lg:ml-10 xl:justify-between xl:w-full'>
          <div className='h-72 w-full banner-bg'>

          </div>
          <div className='flex flex-col items-center md:items-start xl:pl-28'>
            <h1 className='text-4xl font-bold text-center md:text-left'>More than just shorter links</h1>

            <p className='text-center font-medium text-grayViolet mt-4 md:text-left'>
              Build your brand’s recognition and get detailed insights
              on how your links are performing.
            </p>

            <button className='mt-6  bg-cyan text-white w-40 h-11 rounded-full hover:bg-cyanHover slide'>Get Started</button>
          </div>

        </section>
        {/* input section */}
        <section className='url-input px-5 absolute -bottom-24 w-full md:px-7 md:-bottom-20 lg:px-10'>
          <div className='input-bg flex flex-col items-center p-8 rounded-lg md:flex-row'>
            <div className='w-full relative'>
              <input
                className={`w-full py-2 pl-2.5 rounded  ${isInvalid ? 'border-red-500 border-2 placeholder:text-red invalid-input' : 'border-0'}`}
                type="text"
                placeholder="Shorten a link here..."
                value={userInput}
                onChange={(e) => { setUserInput(e.target.value) }}
              />
              {isInvalid ? <div className='w-full text-red-400 text-xs mt-1 absolute -bottom-100%'>Please add a link</div> : null}
            </div>
            
            <button className='bg-cyan text-white w-full h-11 mt-6 rounded md:mt-0 md:w-80 md:ml-2 hover:bg-cyanHover slide' onClick={fetchData}>Shorten It!</button>
          </div>

        </section>
      </div>

      {/* url list */}
      <section className='shorten-url w-full bg-bgGray pt-44 px-5 pb-16 md:px-7 lg:px-10'>

        <ShowUrlList urlList={urlList} />

      </section>

      {/* info section */}
      <section className='info bg-bgGray'>
        <h2 className='text-center text-2xl font-bold'>Advanced Statistics</h2>
        <p className='text-center font-medium text-grayViolet mt-4 mx-4 mb-10 md:mx-32'>Track how your links are performing across the web with our 
        advanced statistics dashboard.</p>
        <div></div>

        <div className='flex flex-col justify-center  z-40 relative lg:flex-row lg:mx-10 '>
        <div className='flex justify-center  absolute top-0 w-full h-full pb-11  lg:items-center lg:px-6'>
            <div className='bg-cyan w-3 h-full z-0 lg:w-full lg:h-3'></div>
          </div>
        {/* Brand Recognition */}
          <article className='bg-white my-8 mx-5 relative rounded lg:h-72'>
            <div className='absolute -top-9  flex justify-center w-full lg:justify-start lg:ml-4'>
              <div className='bg-violet p-4 rounded-full'>
                <img src={Brand} alt='bran recognition icon'/>
              </div>
            </div>
            <h3 className='text-center mt-16 lg:text-left lg:ml-4'>Brand Recognition</h3>
            <p className='text-center font-medium text-grayViolet mt-4 mx-4 mb-6 lg:text-left'>
            Boost your brand recognition with each click. Generic links don’t 
            mean a thing. Branded links help instil confidence in your content.
            </p>
            
          </article>

          {/* Detailed Records */}
          <article className='bg-white my-8 mx-5 relative rounded lg:my-16 lg:h-72'>
            <div className='absolute -top-9  flex justify-center w-full lg:justify-start lg:ml-4'>
              <div className='bg-violet p-4 rounded-full'>
                <img src={Detail} alt='bran recognition icon'/>
              </div>
            </div>
            <h3 className='text-center mt-16 lg:text-left lg:ml-4'>Detailed Records</h3>
            <p className='text-center font-medium text-grayViolet mt-4 mx-4 mb-6 lg:text-left'>
            Gain insights into who is clicking your links. Knowing when and where 
            people engage with your content helps inform better decisions.
            </p>
            
          </article>

          {/* Fully Customizable */}
          <article className='bg-white my-8 mx-5 relative rounded mb-11 lg:my-28 lg:h-72'>
            <div className='absolute -top-9  flex justify-center w-full lg:justify-start lg:ml-4'>
              <div className='bg-violet p-4 rounded-full'>
                <img src={Customize} alt='bran recognition icon'/>
              </div>
            </div>
            <h3 className='text-center mt-16 lg:text-left lg:ml-4'>Fully Customizable</h3>
            <p className='text-center font-medium text-grayViolet mt-4 mx-4 mb-6 lg:text-left'>
            Improve brand awareness and content discoverability through customizable 
            links, supercharging audience engagement.
            </p>
          </article>
          

        </div>
        
      </section>



      <section className='boost-bg flex flex-col items-center '>
        <h3 className='text-center text-white font-bold text-2xl mt-24'>Boost your links today</h3>
        <button className='mt-9  bg-cyan text-white w-40 h-11 rounded-full mb-20 md:mb-10 hover:bg-cyanHover slide'>Get Started</button>
      </section>

      <footer className='bg-bgFooter text-white flex flex-col items-center flex-wrap md:flex-row md:items-start md:pt-12'>
        <div className='mb-9 mt-12 md:ml-4 md:mr-10 lg:mr-40 lg:ml-16 md:mt-0'>
          <img src={FooterLogo} alt='logo'/>
        </div>
        

        
        <ul className='text-center text-grayViolet mb-10 md:mb-0 md:mr-8'>
          <h4 className='mb-4 text-white'>Features</h4>
          <li className='mb-1.5'><a href='#' className='hover:text-cyan'>Link Shortening</a></li>
          <li className='mb-1.5'><a href='#' className='hover:text-cyan'>Branded Links</a></li>
          <li className='mb-1.5'><a href='#' className='hover:text-cyan'>Analytics</a></li>
        </ul>

        
        <ul className='text-center text-grayViolet mb-10 md:mb-0 md:mr-8'>
          <h4 className='mb-4 text-white'>Resources</h4>
          <li className='mb-1.5'><a href='#' className='hover:text-cyan'>Blog</a></li>
          <li className='mb-1.5'><a href='#' className='hover:text-cyan'>Developers</a></li>
          <li className='mb-1.5'><a href='#' className='hover:text-cyan'>Support</a></li>
        </ul>

        
        <ul className='text-center text-grayViolet mb-10 md:mb-0 md:mr-8'>
          <h4 className='mb-4 text-white'>Company</h4>
          <li className='mb-1.5'><a href='#' className='hover:text-cyan'>About</a></li>
          <li className='mb-1.5'><a href='#' className='hover:text-cyan'>Our Team</a></li>
          <li className='mb-1.5'><a href='#' className='hover:text-cyan'>Careers</a></li>
          <li className='mb-1.5'><a href='#' className='hover:text-cyan'>Contact</a></li>
        </ul>

        <ul className='text-center flex mb-10 lg:ml-20'>
          <li className='mr-4'><a href='#'><ReactSVG src={Facebook} /></a></li>
          <li className='mr-4'><a href='#'><ReactSVG src={Twitter} /></a></li>
          <li className='mr-4'><a href='#'><ReactSVG src={Pinterest} /></a></li>
          <li><a href='#'><ReactSVG src={Instagram} /></a></li>
        </ul>

        
      </footer>
      <div className="attribution text-sm text-center bg-bgFooter text-white pt-10">
    Challenge by <a href="https://www.frontendmentor.io?ref=challenge" className='text-cyan' target="_blank">Frontend Mentor</a>. 
    Coded by <a href="#" className='text-cyan'>Perri Hu</a>.
  </div>
      
    </div>
  );
}

export default App;

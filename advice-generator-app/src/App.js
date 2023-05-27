import { useState, useEffect } from 'react';
import './App.css';
import { ReactSVG } from 'react-svg';
import dividerMobile from './images/pattern-divider-mobile.svg';
import dividerDesktop from './images/pattern-divider-desktop.svg';
import dice from './images/icon-dice.svg'

function App() {

  const [advice,setAdvice] = useState('');
  const [loading,setLoading] = useState(true);

  function getAdvice() {
    fetch('	https://api.adviceslip.com/advice')
   .then(response => response.json())
   .then(data => {
     console.log(data);
     setAdvice(data.slip);
     setLoading(false);
     console.log(advice);
   });
  }

  useEffect(() => {
    fetch('	https://api.adviceslip.com/advice')
   .then(response => response.json())
   .then(data => {
     console.log(data);
     setAdvice(data.slip);
     setLoading(false);
     console.log(advice);
   });
  },[])

  

  return (
    <div className="App ">
      <main className='font-main text-textColor grid h-screen place-items-center'>
        <div className='card bg-bgCard w-5/6 rounded-lg relative grid justify-items-center lg:w-2/6'>
          <div className='text-neonGreen tracking-widest text-xs my-6'>
            ADVICE #{advice.id}
          </div>
          <div className='w-10/12 mb-6 text-[28px]'>
            
            <p>“{loading ? "Loading":advice.advice}”</p>
          </div>
          <ReactSVG  src={dividerMobile} className="mb-14 md:hidden"/>
          <ReactSVG  src={dividerDesktop} className="mb-14 hidden md:block"/>
          <button onClick={getAdvice} className="absolute bottom-n23px hover:drop-shadow-btn transition-all">
            <ReactSVG src={dice} className="w-14 h-14 bg-neonGreen grid place-items-center rounded-l-full rounded-r-full"/>
          </button>
          </div>
      </main>
    </div>
  );
}

export default App;

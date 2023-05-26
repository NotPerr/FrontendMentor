import { useState } from 'react';
import './App.css';

function App() {

  const [advice,setAdvice] = useState('');

  function getAdvice() {
    fetch('	https://api.adviceslip.com/advice')
   .then(response => response.json())
   .then(data => {
     console.log(data);
     setAdvice(data.slip);
     console.log(advice);
   });
  }

  

  return (
    <div className="App">
      <main>
        
        <br />
        #{advice.id}
        <br />
        {advice === '' ? 'Click the dice to generate advice' : advice.advice}
        <button onClick={getAdvice}>click me</button>
      </main>
    </div>
  );
}

export default App;

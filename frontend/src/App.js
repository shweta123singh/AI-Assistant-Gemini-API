import './App.css';
import React, { useState } from "react";
import axios from 'axios';

function App() {
  const [question,setQuestion]=useState('');
  const [response,setResponse]=useState('');
  const submitHandler=(e)=>{
    e.preventDefault();
    console.log(question)
    axios.post('https://ai-assistant-frontend-hycu.onrender.com',{
      question:question
    })
    .then(res=>{
      console.log("Full API Response", res.data);
      setResponse(res.data.response);
    })
    .catch(err=>{
      console.log(err)
    })
  }

  const speakHandler=()=>{
    const a =new SpeechSynthesisUtterance(response);
    window.speechSynthesis.speak(a);
   }
  return (
    <div className="App">
      <div className="box">
        <div className='profile-pic'>
          <img className='pic' alt='profile-pic' src={require('../src/assets/boy.png')}/>

        </div>
        <p className='label'>Question</p>
        <textarea onChange={(e)=>{setQuestion(e.target.value)}}/>
        <button onClick={submitHandler}>Send</button> 
      </div>

      <div className="box">
        <div className='profile-pic'>
          <img className='pic' alt='profile-pic' src={require('../src/assets/gemini.png')}/>
         </div>
         
         <p className='label'>Gemini</p>
        <textarea value={response}readOnly/>
        <button onClick={speakHandler}>Speak</button> 

      </div>
      
    </div>
  );
}

export default App;

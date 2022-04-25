 import React, { useState } from 'react'
 import axios from 'axios'

function App() {

  const [word,setWord] = useState();
  const [meaning,setMeanning] = useState();
  const [number,setNumber] = useState("");

  const generateKeyword = async()=>{
   

    const options = {
      method: 'GET',
      url: 'https://wordsapiv1.p.rapidapi.com/words/',
      params: {random: 'true'},
      headers: {
        'X-RapidAPI-Host': 'wordsapiv1.p.rapidapi.com',
        'X-RapidAPI-Key': '6fc365806amsh6dd982091d656a7p1091acjsn52b56a1b70a3'
      }
    };
    
    axios.request(options).then(async (response) =>{
      
         setWord(response.data.word);
         if(!response.data.results[0].definition){
          setMeanning("oops can't find the meaning !")
          setMeanning(null)
         }else{
           setMeanning(response.data.results[0].definition);

         }
      
    }).catch(function (error) {
      console.error(error);
    });
   
   
  }

  function sendMessage(one,two){
    if(number.length===10){
      let message = `${one}: ${two}`
      let url = `https://web.whatsapp.com/send?phone=${number}`;
      url += `&text=${encodeURI(message)}&app_absent=0`;
      window.open(url);
    }
   

  }
 
  
  return ( 
    <div className="container ">
     <div className="row">
       <div className="col-md-5 shadow border rounded m-auto mt-5 text-center py-5"> 
       <button onClick={generateKeyword} className="border-0 shadow bg-success text-white px-3 py-2">
         Generate New Word
       </button>
       {/* <ReactWhatsapp number="+917293103936" message="Hello World!!!" /> */}
       {word ? <p className='h4 text-capitalize py-3 text-info'>{word}</p>:""}
       {meaning ? <p>{meaning}</p>:""}
       <div className="col-md-5 text-center mx-auto ">
         {meaning ? (
          <div className="numbers text-center">
         <input type="number" className='my-3 w-100 outline-none' onChange={((e)=>setNumber(e.target.value))} max={10} min={10} required />
         <button onClick={((e)=>sendMessage(word,meaning))} className="border-0 shadow bg-light text-primary border px-3 py-2" > <img src="https://pngimg.com/uploads/whatsapp/whatsapp_PNG95154.png" alt="" width={25} /> share</button>
       </div>
         ):"" }
       
       </div> 
       </div>
       
       
     </div>
    </div>
  );
}

export default App;

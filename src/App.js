import React, {useState, useEffect, useRef } from 'react';
import Flashcardlist from './Flashcardlist';
import './app.css';
import axios from 'axios';



function App() {
  const[flashcards, setFlashcards]=useState([]) //initaial empty data...we can write SAMPLE also
  const[categories,setCategories]=useState([])
  const categoryEl=useRef()
  const up=useRef()
  


  useEffect(() =>{
    axios.get('https://opentdb.com/api_category.php')
    .then(res => {
      setCategories(res.data.trivia_categories)
    })
  },[])


  useEffect(() => {
   
  },[])


function decodeString(str){
  const textArea = document.createElement('textarea')
  textArea.innerHTML=str
  return textArea.value
}

function handleSubmit(e){
  e.preventDefault()
  axios
  .get('https://opentdb.com/api.php?',{
    params:{
      amount:1000,
      category:categoryEl.current.value
    }
  })
  .then(res => {
    setFlashcards(
    res.data.results.map((questionItem, index) =>{
      const ans=decodeString(questionItem.correct_answer)
      const options=[...questionItem.incorrect_answers.map(a => decodeString(a)), ans]

      return{ //this what returning to flascards variable above setflashcard so this page renders again and displays the api data
        id: '${index}-${Data.now()}',
        q: decodeString(questionItem.question),
        ans: ans,
        options:options.sort(()=> Math.random()-.5)
      }
    }))
   
  })
}
  return (
    <>
    <form className="header" onSubmit={handleSubmit}>
    
    <div className="form-group">
    <label><center><u><b>FlashQuiz</b></u></center></label>
      <label htmlFor="category">Category: </label>
      <select id="category" ref={categoryEl}> 
          {categories.map(category => {
            return <option value={category.id} key={category.id}>{category.name}</option>

          })}
      </select>
    </div>
    <div className="form-group">
      <button className="btn" >Generate</button>
    </div>
    </form>
    <div className="up" ref={up}>
      <button onClick={() => window.scrollTo(0,0)}>up</button>
    </div>
    
    <div className='container'>

        <Flashcardlist flashcards={flashcards}/>
  </div>
  
  </>
  );
}

const SAMPLE_FLASHCARDS = [
{
  id:1,
  q: "what is 2+2 ?",
  ans: '4',
  options:[
    '2',
    '3',
    '4',
    '5'
  ]

},
{
  id:2,
  q: "what is 2-2 ?",
  ans: '0',
  options:[
    '0',
    '3',
    '4',
    '5'
  ]

},
{
  id:3,
  q: "what a 2***2 ?",
  ans: '8',
  options:[
    '2',
    '3',
    '4',
    '8'
  ]

}


]
export default App;

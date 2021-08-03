import React, {useState} from 'react'
import Flashcardlist from './Flashcardlist'


export default function Flashcard({flashcard}) {
    const [flip, setFlip] = useState(false)
    return (
        <div 
        className={`card ${flip ? 'flip' : ''}` }
        onClick={() => setFlip(!flip)}>

        <div className="front">
            {"Q. "+flashcard.q}
            <div className="op"> {"options: "}</div>
           
            <div className="flashcardoptions">
             {flashcard.options.map(option => {
                
                    return <div className="flashcard-options">{"- "}{option}</div>
              })}
            </div>
        </div>

        <div className="back">
            
            {"Answer: "+flashcard.ans}
        
            
        </div>
        
        
        



        </div>
    )
}

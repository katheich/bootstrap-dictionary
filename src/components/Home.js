import React, { useEffect, useState } from 'react'

const top10 = ['pretentious', 'ubiquitious', 'love', 'cynical', 'apathetic', 'conunndrum', 'albeit', 'ambiguous', 'integrity', 'affect']

import WordSearch from './WordSearch'

const Home = (props) => {

  const [title, setTitle] = useState('')

  function autoType(word, typingSpeed){
    var text = word.trim().split('')
    var amntOfChars = text.length
    var newString = ''
    setTimeout(function(){
      for (var i = 0; i < amntOfChars; i++) {
        (function(i,char){
          setTimeout(function() {        
            newString += char
            setTitle(newString)
          }, i * typingSpeed)
        })( i + 1 ,text[i])
      }
    }, 1000)
  }
  

  useEffect(() => {
    autoType('Looking for a word?', 150)
  }, [])
  
  return (
    <div id="homepage">
      <div className="jumbotron jumbotron-fluid">
        <div className="container typewriter">
          <h1 className="title display-3">
            <div className="type-js">{title}<span className="cursor">|</span></div>
          </h1>
          <p className="lead mt-5">Here you can find some.</p>
        </div>
      </div>
      <div className="container">
        <WordSearch props={props} size={'large'} />
      </div>
    </div>
  )
}

export default Home
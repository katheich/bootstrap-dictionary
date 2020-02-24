import React, { useEffect, useState } from 'react'

const TypingTitle = ({ phrase }) => {

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
    autoType(phrase, 150)
  }, [])
  
  return (
    <div className="type-js">{title}<span className="cursor">|</span></div>
  )
}

export default TypingTitle
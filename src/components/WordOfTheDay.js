import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import axios from 'axios'


const WOTD = (props) => {

  const [WOTD, setWOTD] = useState('')

  function fetchWord() {
    axios.get(`https://api.wordnik.com/v4/words.json/wordOfTheDay?api_key=${process.env.wordnikKey}`)
      .then(resp =>  {
        setWOTD(resp.data)
        
      })
      .catch(err => console.log(err))
  }

  useEffect(() => {
    fetchWord()
  }, [])


  return (
    <blockquote className="mt-3 mb-0 blockquote">
      {console.log(WOTD)}
      <div className="lead font-weight-bold">Word of the day</div>
      <Link to={`/reroute/${WOTD.word}`} className="title">{WOTD.word}</Link>
      <div className="">{WOTD.definitions && WOTD.definitions[0].text}</div>
      <p className="small font-weight-light mt-2 blockquote-footer">Provided by Wordnik</p>
    </blockquote>
  )
}

export default WOTD
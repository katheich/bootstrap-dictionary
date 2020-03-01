import React from 'react'

const top10 = ['pretentious', 'ubiquitious', 'love', 'cynical', 'apathetic', 'conunndrum', 'albeit', 'ambiguous', 'integrity', 'affect']

import TypingTitle from './TypingTitle'
import WordSearch from './WordSearch'
import WordOfTheDay from './WordOfTheDay'

const Home = (props) => {
  
  return (
    <div id="homepage">
      <div className="jumbotron jumbotron-fluid">
        <div className="container">
          <h1 className="title display-3">
            <TypingTitle phrase='Looking for a word?' />
          </h1>
          <p className="lead mt-5">Here you can find some.</p>
        </div>
      </div>
      <div className="container">
        <WordSearch props={props} size={'large'} />
        <WordOfTheDay />
      </div>
    </div>
  )
}

export default Home
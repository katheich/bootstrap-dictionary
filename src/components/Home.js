import React from 'react'

const top10 = ['pretentious', 'ubiquitious', 'love', 'cynical', 'apathetic', 'conunndrum', 'albeit', 'ambiguous', 'integrity', 'affect']

import WordSearch from './WordSearch'

const Home = (props) => (
  <div>
    <div className="jumbotron jumbotron-fluid">
      <div className="container">
        <h1 className="title display-3">Looking for words?</h1>
        <p className="lead mt-5">Here you can find some.</p>
      </div>
    </div>
    <div className="container">
      <WordSearch props={props} size={'large'} />
    </div>
  </div>
)

export default Home
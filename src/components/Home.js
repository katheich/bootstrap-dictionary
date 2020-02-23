import React from 'react'

const top10 = ['pretentious', 'ubiquitious', 'love', 'cynical', 'apathetic', 'conunndrum', 'albeit', 'ambiguous', 'integrity', 'affect']

import WordSearch from './WordSearch'

const Home = (props) => (
  <div>
    <div className="jumbotron jumbotron-fluid">
      <div className="container">
        <h1 className="title display-1">Looking for words.</h1>
        <p className="lead">Something something.</p>
      </div>
    </div>
    <WordSearch props={props} />
  </div>
)

export default Home
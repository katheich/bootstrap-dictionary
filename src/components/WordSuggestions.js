import React from 'react'
import { Link } from 'react-router-dom'


const WordSuggestions = ({ data }) => (
  <>
  <div className="h4 title">Did you mean any of the following?</div>
          
  <div className="list-group list-group-horizontal d-flex flex-wrap">
    {data.map((elem, i) => {
      return <Link
        key={i}
        to={`/reroute/${elem}`}
        className="list-group-item justify-content-start border-0"
      >
        {elem}
      </Link>
    })}
  </div>
  </>
)

export default WordSuggestions
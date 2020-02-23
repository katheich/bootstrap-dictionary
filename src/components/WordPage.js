import React, { useState, useEffect } from 'react'
import axios from 'axios'

const WordPage = (props) => {

  const [data, setData] = useState([])

  useEffect(() => {
    axios.get(`https://www.dictionaryapi.com/api/v3/references/collegiate/json/${props.match.params.q}?key=${process.env.apiKey}`)
      .then(resp => setData(resp.data))
      .catch(err => console.log(err))
  }, [])

  return (<div className="container">
    {console.log(data)}
    {props.match.params.q}
  </div>
  )
}

export default WordPage
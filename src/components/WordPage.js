import React, { useState, useEffect } from 'react'
import axios from 'axios'


import WordSuggestions from './WordSuggestions'
import DictionaryEntries from './DictionaryEntries'

const WordPage = (props) => {

  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios.get(`https://www.dictionaryapi.com/api/v3/references/collegiate/json/${props.match.params.q}?key=${process.env.apiKey}`)
      .then(resp => {
        if (resp.data.length === 0) {
          setData( [ 'no suggestions available' ] )
        } else {
          setData(resp.data)
        }
        setLoading(false)
      })
      .catch(err => {
        console.log('ERROR', err)
        setLoading(false)
      })
  }, [])


  return (
    <div>
      {console.log('DATA', data)}
      <div className="jumbotron jumbotron-fluid">
        <div className="container">
          <h1 className="display-5 title">{!loading && data[0].hwi ? data[0].hwi.hw : props.match.params.q}</h1>

          {loading ? <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div> : !data[0].hwi ? 'Sorry, no match could be found.' : 
          
            <div className="font-weight-light">
              {data[0].hwi.prs && `[${data[0].hwi.prs[0].mw}]` } 
              <br />
              <br />
              <em>{data[0].fl}.</em>
              <div className="mt-1">{data[0].shortdef[0]}</div>
            </div>
          }
        </div>
      </div>
      
      <div className="container">

        {!loading && !data[0].hwi ? <WordSuggestions data={data} /> : ''}

        <div className="row">
          <DictionaryEntries data={data} loading={loading} />
        </div>


      </div>
    </div>
  
  )
}

export default WordPage
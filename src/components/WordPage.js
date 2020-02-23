import React, { useState, useEffect } from 'react'
import axios from 'axios'

const WordPage = (props) => {

  const [data, setData] = useState([])

  useEffect(() => {
    axios.get(`https://www.dictionaryapi.com/api/v3/references/collegiate/json/${props.match.params.q}?key=${process.env.apiKey}`)
      .then(resp => setData(resp.data))
      .catch(err => console.log(err))
  }, [])

  return (
    <div>
      {console.log(data)}
      <div className="jumbotron jumbotron-fluid">
        <div className="container">
          <h1 className="text-capitalize display-5">{props.match.params.q}</h1>

          {data.length === 0 ? 'No match could be found.' : 
          
            <div className="font-weight-light">
              [{data[0].hwi.prs[0].mw}] 
              <br />
              <br />
              <em>{data[0].fl}.</em>
              <div className="mt-1">{data[0].shortdef[0]}</div>
            </div>
          }
        </div>
      </div>
      
      <div className="container">
        <div className="row">
          <div className="col-4">
            <div className="list-group list-group-flush">
              {data.length === 0 ? '' : 
            
                data.map((elem, i) => {
                  return <a key={i} className="list-group-item list-group-item-action" href={`#list-item-${i}`}><span className="text-capitalize">{elem.hwi.hw}</span>, {elem.fl}</a>
                })
              }
            </div>
          </div>
          <div className="col-8">
            <div data-spy="scroll" data-target="#list-example" data-offset="0" className="scrollspy-example">

              {data.length === 0 ? '' : 
              
                data.map((elem, i) => {
                  
                  return <div key={i} id={`list-item-${i}`} className="mb-5">
                    <div className="h2">
                      {elem.hwi.hw}
                    </div>
                    <em>{elem.fl}</em>
                    <br />
                    {elem.hwi.prs && <p>[{elem.hwi.prs[0].mw}]</p>}

                    {elem.lbs && elem.lbs.map((label, i) => {
                      return <p key={i}>
                        {label}
                      </p>
                    })}

                    {elem.ins && elem.ins.map((infl, i) => {
                      return <span key={i}>
                        {infl.if}{i === elem.ins.length ? '' : ', '} 
                      </span>
                    })}

                    <div className="h7 font-weight-bold mt-3">Definitions</div>
                    {elem.shortdef.map((def, i) => {
                      return <p className="small font-weight-light my-1" key={i}>
                        {i+1}. {def}
                      </p>
                    })}

                  </div>

                })
              }
            </div>
          </div>
        </div>


      </div>
    </div>
  
  )
}

export default WordPage
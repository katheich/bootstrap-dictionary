import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Scroll from 'react-scroll'

const Element = Scroll.Element
const scroller = Scroll.scroller
const Link = Scroll.Link


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
          <h1 className="text-capitalize display-5 title">{props.match.params.q}</h1>

          {data.length === 0 ? 'Sorry, no match could be found.' : 
          
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
            <div className="list-group list-group-flush sticky-top" id="list" >
              {data.length === 0 ? '' : 
            
                data.map((elem, i) => {

                  return <Link 
                    key={i} 
                    spy={true}
                    smooth={true}
                    className="list-group-item list-group-item-action" 
                    to={`myScrollToElement${i}`}>
                    <span className="font-weight-bold">
                      {elem.hwi.hw}</span>, {elem.fl}
                  </Link>
                })
              }
            </div>
          </div>
          <div className="col-8" data-spy="scroll" data-target="#list" id="definitions">
            <div data-offset="0" className="scrollspy-example">

              {data.length === 0 ? '' : 
              
                data.map((elem, i) => {
                  
                  return <Element key={i} name={`myScrollToElement${i}`}>
                    <div className="pb-5">
                      <div className="h2 title mb-1">
                        {elem.hwi.hw} 
                      </div>
                      <div className="h6 mt-0 mb-3"><em>{elem.fl}</em></div>

                      {elem.hwi.prs && <div>[{elem.hwi.prs[0].mw}]</div>}

                      {elem.lbs && elem.lbs.map((label, i) => {
                        return <div className="small font-weight-light" key={i}>
                          {label}
                        </div>
                      })}

                      {elem.ins && <div><em>also </em> 
                        {elem.ins.map((infl, i) => {
                          return <span key={i}>
                            {infl.if}{i === elem.ins.length - 1 ? '' : ', '}
                          </span>
                        })}
                      </div>
                      }

                      <div className="h7 font-weight-bold mt-3">Definitions</div>
                      {elem.shortdef.map((def, i) => {
                        return <div className="small font-weight-light my-1" key={i}>
                          { i + 1 }. {def}
                        </div>
                      })}
                    </div>
                  </Element>

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
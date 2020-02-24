import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Scroll from 'react-scroll'

const Element = Scroll.Element
const scroller = Scroll.scroller
const ScrollLink = Scroll.Link


const WordPage = (props) => {

  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios.get(`https://www.dictionaryapi.com/api/v3/references/collegiate/json/${props.match.params.q}?key=${process.env.apiKey}`)
      .then(resp => {
        setData(resp.data)
        setLoading(false)
      })
      .catch(err => {
        console.log('ERROR', err)
        setLoading(false)
      })
  }, [])

  function determineAudioFile(audio) {
    let subdirectory = ''

    if (audio.startsWith('bix')) {
      subdirectory = 'bix'
    } else if (audio.startsWith('gg')) {
      subdirectory = 'gg'
    } else if (Number.isInteger(audio[0]) || !audio[0].match(/[a-zA-Z]/)) {
      subdirectory = 'number'
    } else {
      subdirectory = audio[0]
    }

    return `https://media.merriam-webster.com/soundc11/${subdirectory}/${audio}.wav` 
  }

  function playSound(e, audio) {
    e.preventDefault()
    const path = determineAudioFile(audio)
    const sound = new Audio(path)
    sound.play()
  }

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

        {!loading && !data[0].hwi ? <>
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
          </> : ''
        }

        <div className="row">
          <div className="col-4">
            <div className="list-group list-group-flush sticky-top" id="list" >
              {loading || !data[0].hwi ? '' : 
            
                data.map((elem, i) => {

                  return <ScrollLink 
                    key={i} 
                    spy={true}
                    smooth={true}
                    className="list-group-item list-group-item-action" 
                    to={`myScrollToElement${i}`}>
                    <span className="font-weight-bold d-inline">
                      {elem.hwi.hw}</span><span className="d-none d-md-inline">, {elem.fl}</span>
                  </ScrollLink>
                })
              }
            </div>
          </div>

          <div className="col-8" data-spy="scroll" data-target="#list" id="definitions">
            <div data-offset="0" className="scrollspy-example">

              {loading || !data[0].hwi ? '' : 
              
                data.map((elem, i) => {
                  
                  return <Element key={i} name={`myScrollToElement${i}`}>
                    <div className="pb-5">
                      <div className="h2 title mb-1">
                        {elem.hwi.hw} 
                      </div>
                      <div className="h6 mt-0 mb-3"><em>{elem.fl}</em></div>

                      {elem.hwi.prs && <div className="flex-row">
                        <div className="d-inline-flex">
                        [{elem.hwi.prs[0].mw}]
                        </div>

                        <button type="button" className="btn btn-link p-0 ml-2" onClick={e => playSound(e, elem.hwi.prs[0].sound.audio)}>
                          <i className="fas fa-volume-up"></i>
                        </button>
                      </div>}


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
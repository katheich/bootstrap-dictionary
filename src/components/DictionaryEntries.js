import React, { useState, useEffect } from 'react'
import Scroll from 'react-scroll'

const Element = Scroll.Element
// const scroller = Scroll.scroller
const ScrollLink = Scroll.Link


const DictionaryEntries = ({ data, loading }) => {

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


  return (<>
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
  </>
   
  )
}

export default DictionaryEntries
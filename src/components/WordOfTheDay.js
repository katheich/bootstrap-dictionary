import React, { useState, useEffect } from 'react'


const WOTD = (props) => {

  const [wotd, getWOTD] = useState('')

  function fetchWord() {
    return
  }


  return (
    <div>
      {console.log(process.env.wordnikKey)}
    </div>
  )
}

export default WOTD
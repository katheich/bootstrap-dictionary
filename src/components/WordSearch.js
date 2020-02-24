import React, { useState } from 'react'

const WordSearch = ({ props, size }) => {

  const [keyword, setKeyword] = useState('')

  function handleChange(e) {
    setKeyword(e.target.value)
  }

  function handleSearch (e) {
    e.preventDefault()
    if (keyword) {
      const path = `/reroute/${keyword}`
      setKeyword('')
      props.history.push(path)
    } 
    
  }

  return (
    <form className="form-inline">
      <label className="sr-only" htmlFor="inlineFormInputName2">Search word</label>
      <input type="text" className={'form-control ' + `${size === 'small' ? 'form-control-sm mr-sm-2' : 'mb-2 mr-sm-2 pr-5'}`} id="inlineFormInputName2" placeholder="Enter a word" value={keyword} onChange={handleChange} />
      <button type="submit" className={'btn btn-primary ' + `${size === 'small' ? 'btn-sm my-2 my-sm-0' : 'mb-2 px-5'}`} onClick={handleSearch}><i className="fas fa-search"></i></button>
    </form>
  )
}

export default WordSearch
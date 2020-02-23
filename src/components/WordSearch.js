import React, { useState } from 'react'

const WordSearch = ({ props }) => {

  const [keyword, setKeyword] = useState('')

  function handleChange(e) {
    setKeyword(e.target.value)
  }

  function handleSearch (e) {
    e.preventDefault()
    if (keyword) {
      const path = `/search/${keyword}`
      props.history.push(path)
    } 
    
  }

  return (
    <div className="container">
      <form className="form-inline">
        <label className="sr-only" htmlFor="inlineFormInputName2">Search word</label>
        <input type="text" className="form-control mb-2 mr-sm-2 pr-5" id="inlineFormInputName2" placeholder="Search for a word" value={keyword} onChange={handleChange} />
        <button type="submit" className="btn btn-primary mb-2 px-5" onClick={handleSearch}>Search</button>
      </form>
    </div>
  )
}

export default WordSearch
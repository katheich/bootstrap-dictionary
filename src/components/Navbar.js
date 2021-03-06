import React from 'react'
import { Link, withRouter } from 'react-router-dom'


import WordSearch from './WordSearch'

const Navbar = (props) => (

  <nav className="navbar navbar-light">
    <Link className="navbar-brand title" to="/">Looking for a word?</Link>
    <WordSearch size={'small'} props={props} />
  </nav>

)

export default withRouter(Navbar)
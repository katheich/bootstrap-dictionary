import React from 'react'
import { Link, withRouter } from 'react-router-dom'


import WordSearch from './WordSearch'

const Navbar = (props) => (

  <nav className="navbar navbar-light bg-light">
    <Link className="navbar-brand title mx-4" to="/">?</Link>
    <WordSearch size={'small'} props={props} />
  </nav>

)

export default withRouter(Navbar)
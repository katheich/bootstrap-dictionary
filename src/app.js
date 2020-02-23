import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter, Switch, Route } from 'react-router-dom'

import './styles/style.scss'

import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './components/Home'
import WordPage from './components/WordPage'

const App = () => (
  <HashRouter>
    <Navbar />
    <Switch>
      <Route exact path="/" render={(props) => <Home {...props} />} />
      <Route exact path="/search/:q" component={WordPage} />
    </Switch>
    <Footer />
  </HashRouter>
)



ReactDOM.render(
  <App />,
  document.getElementById('root')
)
import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter, Switch, Route } from 'react-router-dom'

import './styles/style.scss'

import Home from './components/Home'
import WordPage from './components/WordPage'

const App = () => (
  <HashRouter>
    <Switch>
      <Route exact path="/" render={(props) => <Home {...props} />} />
      <Route exact path="/search/:q" component={WordPage} />
    </Switch>
  </HashRouter>
)



ReactDOM.render(
  <App />,
  document.getElementById('root')
)
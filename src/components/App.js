import React, { Component } from 'react'
import {Switch, Route} from 'react-router-dom'
import {AuthPage, LayoutPage, RegPage, ChangePasPage, SetPasPage} from './container'
import E404 from './E404'

class App extends Component {

  render() {
    return (
      <Switch>
        <Route exact path="/" component={AuthPage}/>
        <Route path="/registration" component={RegPage}/>
        <Route path="/change" component={ChangePasPage}/>
        <Route path="/setpass" component={SetPasPage}/>
        <Route path="/feed" component={LayoutPage}/>
        <Route component={E404}/>
      </Switch>
    )
  }
}

export default App;

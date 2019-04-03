import React from 'react'
import {Route} from 'react-router-dom'

const PrivateRoute  = ({component: Component, authed, ...rest}) => {
    return (
      <Route
        {...rest}
        render={(props) => authed === true
          ? <Component {...props}/>
          : <Redirect to='/'/>}
      />
    )
  }

export default PrivateRoute
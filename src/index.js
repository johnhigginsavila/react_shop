import React from 'react'
import { render } from 'react-dom'
import { Router,Route, hashHistory } from 'react-router'
//import { BrowserRouter, HashRouter, hashHistory, Switch, Route } from 'react-router-dom'

import { App } from './components/App'
import { Invalid404 } from './components/Invalid404'

window.React = React


render(
    <Router history={hashHistory}>
        <Route path="/" component={App}/>
        <Route path="product-list" component={App}>
            <Route path=":filter" component={App} />
        </Route>
        <Route path="admin" component={App}/>
        <Route path="*" component={Invalid404} />
    </Router>
	,
	document.getElementById('react-container')
)
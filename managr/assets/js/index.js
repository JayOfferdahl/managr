import React from 'react'
import { render } from 'react-dom'
import { Router, Route, hashHistory } from 'react-router'
import App from './components/App'

import ProjectOverview from './components/ProjectOverview'
import Milestones from './components/Milestones'
import Finance from './components/Finance'
import Documents from './components/Documents'
import PastProjects from './components/PastProjects'
import CreateNewBid from './components/CreateNewBid'


render((
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      {/* make them children of 'App' */}
      <Route path="/overview" component={ProjectOverview}/>
      <Route path="/milestones" component={Milestones}/>
      <Route path="/finance" component={Finance}/>
      <Route path="/documents" component={Documents}/>
      <Route path="/createnewbid" component={CreateNewBid}/>
      <Route path="/pastprojects" component={PastProjects}/>

    </Route>
  </Router>
), document.getElementById('container'))

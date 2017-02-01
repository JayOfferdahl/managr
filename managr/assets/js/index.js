import React from 'react'
import { render } from 'react-dom'
import { Router, Route, hashHistory } from 'react-router'
import App from './components/App'


//nested components of the overview tab
import Summary from './components/overview/Summary'
import Equipment from './components/overview/Equipment'
import Labor from './components/overview/Labor'
import Materials from './components/overview/Materials'
import Activity from './components/overview/Activity'

import Milestones from './components/main/Milestones'
import Finance from './components/main/Finance'
import Documents from './components/main/Documents'
import PastProjects from './components/main/PastProjects'
import CreateNewBid from './components/main/CreateNewBid'
import Overview from './components/main/Overview'



render((
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      {/* make them children of 'App' */}
      <Route path="/overview" component={Overview}>
        {/* make them children of overview */}
        <Route path="/summary" component={Summary} />
        <Route path="/equipment" component={Equipment} />
        <Route path="/labor" component={Labor} />
        <Route path="/materials" component={Materials} />
        <Route path="/activity" component={Activity} />
      </Route>
      <Route path="/milestones" component={Milestones}/>
      <Route path="/finance" component={Finance}/>
      <Route path="/documents" component={Documents}/>
      <Route path="/createnewbid" component={CreateNewBid}/>
      <Route path="/pastprojects" component={PastProjects}/>

    </Route>
  </Router>
), document.getElementById('container'))

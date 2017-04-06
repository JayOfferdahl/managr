import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App';
import NavAndHeader from './components/app_components/NavAndHeader'

import EnsureAuthenticated from './components/authentication/EnsureAuthenticated'

import NewBid from './components/bids/NewBid'
import Proposal from './components/proposals/Proposal'

import DocumentsList from './components/documents/DocumentsList'

import Activity from './components/project/Activity'
import Equipment from './components/project/Equipment'
import Labor from './components/project/Labor'
import Materials from './components/project/Materials'
import Milestones from './components/project/Milestones'
import Overview from './components/project/Overview'
import Summary from './components/project/Summary'

import PastProjectsList from './components/project_history/PastProjectsList'

import Finance from './components/reports/Finance'

import LoginPage from './components/signup/LoginPage'
import SignupPage from './components/signup/SignupPage'

export default (
	<Route path="/" component={App}>
		<Route path="/signup" component={SignupPage}></Route>
		<Route path="/login" component={LoginPage}></Route>
		<Route component={EnsureAuthenticated}>
			<Route component={NavAndHeader}>
				<Route path="/overview" component={Overview}>
					<Route path="/summary" component={Summary} />
			        <Route path="/equipment" component={Equipment} />
			        <Route path="/labor" component={Labor} />
			        <Route path="/materials" component={Materials} />
			        <Route path="/activity" component={Activity} />
				</Route> {/* End Overview */}
				<Route path="/milestones" component={Milestones}/>
				<Route path="/finance" component={Finance}/>
				<Route path="/documents" component={DocumentsList}/>
				<Route path="/createnewbid" component={NewBid}/>
				<Route path="/createnewproposal" component={Proposal} />
				<Route path="/pastprojects" component={PastProjectsList}/>
			</Route> {/* End NavAndHeader */}
		</Route> {/* End EnsureAuthenticated */}
	</Route>
)

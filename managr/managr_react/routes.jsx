import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App';
import NavAndHeader from './components/app_components/NavAndHeader'

import EnsureAuthenticated from './components/authentication/EnsureAuthenticated'

import CreateBid from './components/bids/CreateBid'
import UpdateBid from './components/bids/UpdateBid'
import CreateProposal from './components/proposals/CreateProposal'
import UpdateProposal from './components/proposals/UpdateProposal'

import CreateCompanyPage from './components/companies/CreateCompanyPage'

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
import ShowProposals from './components/bids/ShowProposals'

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
				<Route path="/milestones" component={Milestones} />
				<Route path="/finance" component={Finance} />
				<Route path="/documents" component={DocumentsList} />
				<Route path="/create-bid" component={CreateBid} />
				<Route path="/update-bid" component={UpdateBid} />
				<Route path="/create-proposal" component={CreateProposal} />
				<Route path="/update-proposal" component={UpdateProposal} />
				<Route path="/past-projects" component={PastProjectsList} />
				<Route path="/show-proposals" component={ShowProposals} />
			</Route> {/* End NavAndHeader */}
			<Route path="create-company-:company_type" component={CreateCompanyPage} />
		</Route> {/* End EnsureAuthenticated */}
	</Route>
)

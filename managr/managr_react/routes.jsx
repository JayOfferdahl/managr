import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App';

import LoginPage from './components/signup/LoginPage'
import SignupPage from './components/signup/SignupPage'
import CreateCompanyPage from './components/companies/CreateCompanyPage'
import EnsureAuthenticated from './components/authentication/EnsureAuthenticated'

import NavAndHeader from './components/app_components/NavAndHeader'

import Dashboard from './components/app_components/Dashboard'

import Proposal from './components/proposals/Proposal'
import CreateProposal from './components/proposals/CreateProposal'
import UpdateProposal from './components/proposals/UpdateProposal'
import ShowProposals from './components/bids/ShowProposals'

import ProjectOverview from './components/project/ProjectOverview'
import Summary from './components/project/Summary'
import Equipment from './components/project/Equipment'
import Labor from './components/project/Labor'
import Materials from './components/project/Materials'
import Activity from './components/project/Activity'
import Finance from './components/reports/Finance'
import Milestones from './components/project/Milestones'
import DocumentsList from './components/documents/DocumentsList'
import ProjectSettings from './components/project/ProjectSettings'
import CreateProject from './components/project/CreateProject'

import PastProjectsList from './components/project_history/PastProjectsList'

export default (
<Route path="/" component={App}>
	<IndexRoute component={LoginPage} />
    <Route path="signup" component={SignupPage} />
    <Route component={EnsureAuthenticated}>
        <Route component={NavAndHeader}>
            {/* TODO: Add dashboard route which shows all projects/proposals/bids */}
            <Route path="dashboard" component={Dashboard} />
            {/* Project Routes */}
            <Route path="project/:project_uuid" component={ProjectOverview}></Route>
            {/*
                <Route component={Overview}>
                    <Route path="summary" component={Summary}/>
                    <Route path="equipment" component={Equipment}/>
                    <Route path="labor" component={Labor}/>
                    <Route path="materials" component={Materials}/>
                    <Route path="activity" component={Activity}/>
                </Route>
            */}
            <Route path="finance" component={Finance}/>
            <Route path="milestones/:project_uuid" component={Milestones}/>
            <Route path="documents" component={DocumentsList}/>
            <Route path="project-settings" component={ProjectSettings}/>
            <Route path="create-project" component={CreateProject} />

            {/* Proposal/Bid Routes */}
            <Route path="create-proposal" component={CreateProposal}/>
            <Route path="proposal/:proposal_uuid" component={Proposal}/>
            <Route path="update-proposal/:proposal_uuid" component={UpdateProposal}/>
            <Route path="show-proposals" component={ShowProposals}/>

            {/* Past Projects Routes */}
            <Route path="past-projects" component={PastProjectsList}/>
        </Route> {/* End NavAndHeader */}
        <Route path="create-company-:company_type" component={CreateCompanyPage} />
    </Route> {/* End EnsureAuthenticated */}
</Route>
)

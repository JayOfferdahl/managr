import React from 'react';

import { Nav, NavItem } from 'react-bootstrap';

import Summary from './Summary';
import Equipment from './Equipment';
import Labor from './Labor';
import Materials from './Materials';
import Activity from './Activity';

import '../../assets/css/App.css';

const NAV_SECTIONS = ['Summary', 'Equipment', 'Labor', 'Materials', 'Activity'];

class OverviewContent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {currentTab: 'Summary'};
    }

    changeTab(tabName) {
        this.setState({currentTab: tabName});
    }

    render() {
        let content, project_uuid = this.props.project_uuid;

        switch(this.state.currentTab) {
            case 'Summary':
                content = <Summary project_uuid={project_uuid} />
                break;
            case 'Equipment':
                content = <Equipment project_uuid={project_uuid} />
                break;
            case 'Labor':
                content = <Labor project_uuid={project_uuid} />
                break;
            case 'Materials':
                content = <Materials project_uuid={project_uuid} />
                break;
            case 'Activity':
                content = <Activity project_uuid={project_uuid} />
                break;
            default:
                content = <h3>Invalid tab selected.</h3>
        }
        return (
            <div>
                <Nav bsStyle="tabs" justified>
                {
                    _.map(NAV_SECTIONS, (section, index) => {
                        let active = false;

                        if(this.state.currentTab == section)
                            active = true;
                        
                        return (
                            <NavItem
                                key={index}
                                className={active ? "active" : ""}
                                onClick={this.changeTab.bind(this, section)}
                                >
                                {section}
                            </NavItem>
                        );
                    })
                }
                </Nav>
                <br/>
                {content}            
            </div>
        )
    }
}

export default OverviewContent;

import React, { Component } from 'react';
import { Panel, Nav, NavItem } from 'react-bootstrap'

export default class ItemOverview extends Component {

  constructor(props){
    super(props)
    this.state = {
      activeKey: 2
    }
  }

  handleSelect(selectedKey){
    this.setState({
      activeKey: selectedKey
    })
  }

  render() {
    return (
      <Panel className="item-overview-container">
        <Nav bsStyle="tabs" justified activeKey={this.state.activeKey} onSelect={this.handleSelect.bind(this)}>
          <NavItem className="item-overview-tab" eventKey={1} >{this.props.active} Active {this.props.type}</NavItem>
          <NavItem className="item-overview-tab" eventKey={2} >{this.props.total} Total {this.props.type}</NavItem>
        </Nav>
        <div className="overview-body">
          {this.state.activeKey == 1 ?
            <p>This will display only active {this.props.type}</p>
            :
            <p>This will display total {this.props.type}.</p>}
        </div>
      </Panel>
    )
  }
}

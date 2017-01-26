import React, { Component } from 'react'
import { Row } from 'react-bootstrap'
import './App.css'

import logo from '../../img/logo.png';
import avatar from '../../img/avatar.png';

export default class Header extends Component {
  render() {
    return (
      <Row className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div className="avatar-section">
          <div className="avatar-text">
            <p><b>John Smith</b></p>
          </div>
          <img src={avatar} className="avatar-icon" alt="avatar" />
        </div>
      </Row>
    )
  }
}

import React from 'react';
import { connect } from 'react-redux';

import BidForm from './BidForm'
import Overview from '../project/Overview'

//import { authenticateWithManagrServer, setAuthenticatedState } from '../../actions/AuthenticationActions';

class NewBid extends React.Component {
	render() {
     return(
			 <div className="newbid-container">
      	 <BidForm button_text="Create New Bid" />
		 	 </div>
		 );
	}
}

export default NewBid;

import React from 'react';
import AutoSuggestExample from './AutoSuggestExample'

import '../../assets/css/App.css';

class NewBid extends React.Component {
    render () {
        return (
          <div>
            <h3 className="placeholder">This will be the Create New Bid tab</h3>
            <p>Here is an example Auto Suggest.</p>
            <AutoSuggestExample />
          </div>
        )
    }
}

export default NewBid;

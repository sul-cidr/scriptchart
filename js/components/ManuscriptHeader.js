import React from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class ManuscriptHeader extends React.Component {
    constructor(props) {
      super(props);
  
      this.showManifest = this.showManifest.bind(this);
    }
  
    showManifest() {
      console.log("Header notes manifest display request for " + this.props.manifestURL);
      this.props.displayManifest(this.props.manifestURL, this.props.onManifestSelected);
    }
  
    render() {
      return <p>{this.props.shelfmark} <FontAwesomeIcon color="#0000FF"
                                                        icon="book-open"
                                                        onClick={this.showManifest}
                                                        style={{ cursor: 'pointer' }} /></p>;
    }
  }

  export default ManuscriptHeader;
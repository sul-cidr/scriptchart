import React from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class ColumnControls extends React.Component {
    constructor(props) {
      super(props);

      this.showManifest = this.showManifest.bind(this);
      this.hideColumn = this.hideColumn.bind(this);
    }
  
    showManifest() {
      console.log("Header notes manifest display request for " + this.props.manifestURL);
      this.props.displayManifest(this.props.manifestURL, this.props.onManifestSelected);
    }
    hideColumn() {
      this.props.onHiddenChange( "hide", "column", this.props.msid);
    }
  
    render() {
      return <p><span style={{float: "left"}} className="remove" onClick={this.hideColumn} style={{ cursor: 'pointer' }}>&#10007;</span>
      <span style={{float: "right"}}><FontAwesomeIcon color="#0000FF" icon="book-open" onClick={this.showManifest} style={{ cursor: 'pointer' }} /></span></p>;
    }
  }

  export default ColumnControls;
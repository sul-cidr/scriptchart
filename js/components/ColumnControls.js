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
      console.log("Clicked button to hide manuscript column " + this.props.msid);
      this.props.onHiddenChange( "hide", "column", this.props.msid);
    }
  
    render() {
      let manifestSpan = "";
      if (this.props.manifestURL != null) {
        manifestSpan = <span style={{float: "right"}}><FontAwesomeIcon color="#0000FF" icon="book-open" onClick={this.showManifest} style={{ cursor: 'pointer' }} /></span>;
      }
      return (<p><span style={{float: "left"}} className="remove" onClick={this.hideColumn} style={{ cursor: 'pointer' }}>&#10007;</span>
      {manifestSpan}</p>);
    }
  }

  export default ColumnControls;
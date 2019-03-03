import React from "react";

class ManuscriptItem extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    if (this.props.hasOwnProperty("onHiddenChange")) {
      this.props.onHiddenChange("show", "column", this.props.manuscriptID);
    }
  }

  render() {
    return (
      <li onClick={this.handleClick} style={{ cursor: 'pointer' }}>{this.props.display}</li>
    );
  }
}

export default ManuscriptItem;
import React from "react";

/* ManuscriptItem: a basic list element representation of a manuscript,
 * to be displayed in the "Hidden Items" ChartAccordion component.
 * When clicked, signals the ChartAccordion and eventually the DashTabs
 * to redisplay the manuscript and remove it from the hidden list.
 */

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
      <li onClick={this.handleClick} style={{ cursor: "pointer" }}>
        {this.props.display}
      </li>
    );
  }
}

export default ManuscriptItem;

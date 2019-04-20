import React from "react";

import Popup from "reactjs-popup";

import "./index.css"

class PopupImage extends React.Component {

  render() {
    return(
      <div className={"letter-image"}>
        <Popup
          trigger={this.props.triggerImage}
          position="top center"
          contentStyle={{
            width: this.props.contextWidth + 10,
            height: this.props.contextHeight + 10
          }}
          on={this.props.contextMode}
        >
          {this.props.contextImage}
        </Popup>
      </div>);
  }

}

export default PopupImage;
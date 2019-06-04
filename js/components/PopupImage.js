import React from "react";

/* PopupImage - This class encapsulates the popup widget that appears when
 * a binarized or untrimmed letter is clicked or hovered (depending on the
 * setting from the options form).
 */

import Popup from "reactjs-popup";

import "./index.css";

class PopupImage extends React.Component {
  render() {
    return (
      <div className={"letter-image"}>
        <Popup
          trigger={this.props.triggerImage}
          position="top center"
          contentStyle={{
            width: `${this.props.width}px`, // note: images are sometimes smaller than this, but never bigger
            zIndex: 31 // Needs to occlude header, which is 30
          }}
          on={this.props.contextMode}
          arrow={false}
          modal={this.props.contextMode == "click"}
          // lockScroll={true}  // this might be nice if the panes are full-height and locked
          mouseEnterDelay={300}
          keepTooltipInside={true}
        >
          {this.props.contextImage}
        </Popup>
      </div>
    );
  }
}

export default PopupImage;

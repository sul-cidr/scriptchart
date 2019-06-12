import React from "react";
import ReactDOM from "react-dom";

/* PopupImage - This class encapsulates the popup widget that appears when
 * a binarized or untrimmed letter is clicked or hovered (depending on the
 * setting from the options form).
 */

import Popup from "reactjs-popup";

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
          mouseEnterDelay={300}
          keepTooltipInside={true}
          {...(this.props.contextMode === "click"
            // This is a hack to work around a bug in the react-popup third-party
            //  library; the library sets "position: relative" on the trigger
            //  element (the image, in our case) and doesn't remove it on close.
            // This causes an trigger image that has previously been, er, triggered
            //  to remain clickable 'through' the overlay which closes an already
            //  open popup.
            ? {
                onClose: () =>
                  ReactDOM.findDOMNode(this)
                    .querySelector("img")
                    .style.removeProperty("position")
              }
            : {})}
        >
          {this.props.contextImage}
        </Popup>
      </div>
    );
  }
}

export default PopupImage;

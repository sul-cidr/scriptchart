import React from "react";

import { API_ROOT } from "./App";

/* LetterImage - displays a letter image retrieved from
 * a URL that points to the image on the backend server.
 * It also resizes the image according to the size specified
 * in the configuration form, maintaining the aspect ratio
 * of the original.
 */

const SMALL_DIM = 25;
const MEDIUM_DIM = 50;
const LARGE_DIM = 100;

const SMALL_MARGIN = 10;
const MEDIUM_MARGIN = 20;
const LARGE_MARGIN = 30;

class LetterImage extends React.Component {
  constructor(props) {
    super(props);

    this.state = { visibleImage: "mask" };

    this.resizeKeepAspect = this.resizeKeepAspect.bind(this);
    this.onImageClick = this.onImageClick.bind(this);
  }

  /* Canvas-based code may eventually be useful when loading
   * and possibly cropping non-binarized images with variable-sized
   * crop margins.
   */
  /*componentDidMount() {

    const ctx = this.refs.canvas.getContext('2d');
    const img = this.refs.image;
    
    img.onload = () => {

      ctx.drawImage(img,0,0,dims['width'],dims['height']);
    }

  }*/

  resizeKeepAspect(inWidth, inHeight, maxDim) {
    let hwRatio = parseFloat(inHeight) / parseFloat(inWidth);
    if (inWidth >= inHeight) {
      return { height: Math.round(hwRatio * maxDim), width: maxDim };
    } else {
      return { height: maxDim, width: Math.round(maxDim / hwRatio) };
    }
  }

  onImageClick() {
    if (this.state.visibleImage == "mask") {
      this.refs.mask.className = "hidden";
      this.refs.context.className = "";
      this.setState({ visibleImage: "context" });
    } else {
      this.refs.mask.className = "";
      this.refs.context.className = "hidden";
      this.setState({ visibleImage: "mask" });
    }
  }

  render() {
    let imgWidth = this.props.coords.width;
    let imgHeight = this.props.coords.height;

    let dims = { imgWidth, imgHeight };
    let maxDim = Math.max(imgWidth, imgHeight);
    if (this.props.sizeClass == "Small") {
      maxDim = SMALL_DIM;
      dims = this.resizeKeepAspect(imgWidth, imgHeight, maxDim);
    } else if (this.props.sizeClass == "Medium") {
      maxDim = MEDIUM_DIM;
      dims = this.resizeKeepAspect(imgWidth, imgHeight, maxDim);
    } else {
      maxDim = LARGE_DIM;
      dims = this.resizeKeepAspect(imgWidth, imgHeight, maxDim);
    }

    let margin = MEDIUM_MARGIN;

    let leftExpanded = Math.max(0, this.props.coords.left - margin);
    let topExpanded = Math.max(0, this.props.coords.top - margin);
    let rightExpanded = Math.min(
      this.props.coords.pagewidth,
      this.props.coords.left + this.props.coords.width + margin
    );
    let widthExpanded = rightExpanded - leftExpanded;
    let bottomExpanded = Math.min(
      this.props.coords.pageheight,
      this.props.coords.top + this.props.coords.height + margin
    );
    let heightExpanded = bottomExpanded - topExpanded;

    let cropURL =
      API_ROOT +
      "crop?page_url=" +
      this.props.coords.pageurl +
      "&x=" +
      leftExpanded +
      "&y=" +
      topExpanded +
      "&w=" +
      widthExpanded +
      "&h=" +
      heightExpanded;

    return (
      <span
        style={{ margin: "5px", display: "inline-block" }}
        onClick={this.onImageClick}
      >
        {/*{<canvas ref="canvas" width={maxDim} height={maxDim} className="hidden"   />*/}
        <img
          alt={this.props.letter}
          ref="context"
          src={cropURL}
          className="hidden"
        />
        <img
          alt={this.props.letter}
          ref="mask"
          width={dims.width}
          height={dims.height}
          src={this.props.coords.binaryurl}
        />
      </span>
    );
  }
}

export default LetterImage;

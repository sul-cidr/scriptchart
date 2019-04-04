import React from "react";

/* LetterImage - displays a letter image retrieved from a URL that points
 * to the image on the backend server.
 * May show 1) a binarized letter image that has been resized to a given max
 * width or height (maintaining original aspect ration), or 2) a cropped
 * manuscript image of the letter with a variably sized contextual margin
 * around it that is generated dynmaically via the backend API, or
 * 3) a binarized letter image that pops up the cropped manuscript image
 * when hovered.
 */

import Popup from "reactjs-popup";

import { API_ROOT } from "./App";

import "./index.css";

const SMALL_DIM = 25;
const MEDIUM_DIM = 50;
const LARGE_DIM = 100;

const MEDIUM_CROP_MARGIN = 10;
const LARGE_CROP_MARGIN = 20;

class LetterImage extends React.Component {
  constructor(props) {
    super(props);

    this.resizeKeepAspect = this.resizeKeepAspect.bind(this);
    this.getCropURL = this.getCropURL.bind(this);
  }

  resizeKeepAspect(inWidth, inHeight, maxDim) {
    let hwRatio = parseFloat(inHeight) / parseFloat(inWidth);
    if (inWidth >= inHeight) {
      return { height: Math.round(hwRatio * maxDim), width: maxDim };
    } else {
      return { height: maxDim, width: Math.round(maxDim / hwRatio) };
    }
  }

  getCropURL() {
    /* Compute dimensions of the cropped manuscript image, including any
     * user-specified contextual margin around it, and construct a URL
     * to request this image from the backend.
     */
    let marginSize = 0;
    if (this.props.cropMargin == "Medium") {
      marginSize = MEDIUM_CROP_MARGIN;
    } else if (this.props.cropMargin == "Large") {
      marginSize = LARGE_CROP_MARGIN;
    }

    let leftExpanded = Math.max(0, this.props.coords.left - marginSize);
    let topExpanded = Math.max(0, this.props.coords.top - marginSize);
    let rightExpanded = Math.min(
      this.props.coords.pagewidth,
      this.props.coords.left + this.props.coords.width + marginSize
    );
    let widthExpanded = rightExpanded - leftExpanded;
    let bottomExpanded = Math.min(
      this.props.coords.pageheight,
      this.props.coords.top + this.props.coords.height + marginSize
    );
    let heightExpanded = bottomExpanded - topExpanded;

    return (
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
      heightExpanded
    );
  }

  componentDidMount() {
    /* This forces the browser to preload the image so it's ready to be
     * shown in the popup -- no state management needed!
     */
    if (this.props.imageDisplay == "hover") {
      const croppedImage = new Image();
      croppedImage.src = this.getCropURL();
    }
  }

  render() {
    let coordsWidth = this.props.coords.width;
    let coordsHeight = this.props.coords.height;

    /* Rather than conditionally define the HTML elements for the binarized
     * and/or cropped images, it's less complicated just to compute the
     * details of both and then use them when needed -- after all, the real
     * overhead is incurred when they load, which only happens for the
     * image(s) involved in the final render.
     */

    /* Dimensions of the displayed binarized image */
    let dims = { coordsWidth, coordsHeight };
    let maxDim = Math.max(coordsWidth, coordsHeight);
    if (this.props.imageSize == "Small") {
      maxDim = SMALL_DIM;
      dims = this.resizeKeepAspect(coordsWidth, coordsHeight, maxDim);
    } else if (this.props.imageSize == "Medium") {
      maxDim = MEDIUM_DIM;
      dims = this.resizeKeepAspect(coordsWidth, coordsHeight, maxDim);
    } else {
      maxDim = LARGE_DIM;
      dims = this.resizeKeepAspect(coordsWidth, coordsHeight, maxDim);
    }
    let binarizedImage = (
      <img
        alt={this.props.letter}
        ref="binarized"
        width={dims.width}
        height={dims.height}
        src={this.props.coords.binaryurl}
      />
    );

    let cropURL = this.getCropURL();

    let croppedImage = (
      <img alt={this.props.letter} ref="cropped" src={cropURL} />
    );

    let imageSpan = <span />;

    if (this.props.imageDisplay == "binarized") {
      imageSpan = (
        <span className={"letter-row"}>
          {binarizedImage}
        </span>
      );
    } else if (this.props.imageDisplay == "cropped") {
      imageSpan = (
        <span className={"letter-row"}>
          {croppedImage}
        </span>
      );
    } else {
      // this.props.imageDisplay == "hover"
      imageSpan = (
        <span className={"letter-row"}>
          <Popup trigger={binarizedImage} position="top center" on="hover">
            {croppedImage}
          </Popup>
        </span>
      );
    }

    return imageSpan;
  }
}

export default LetterImage;

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

const IMAGE_DIMS = { Small: 25, Medium: 50, Large: 100 };
const CROP_MARGINS = { Small: 25, Medium: 50, Large: 100 };

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

  getCropURL(marginSize=0) {
    /* Compute dimensions of the cropped manuscript image, including any
     * user-specified contextual margin around it, and construct a URL
     * to request this image from the backend.
     */

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

    if (isNaN(leftExpanded) || isNaN(topExpanded) || isNaN(widthExpanded) || isNaN(heightExpanded)) {
      console.log("NaN in getCropURL, marginSize is ")
    }

    let cropURL = API_ROOT +
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

    return { url: cropURL, width: widthExpanded, height: heightExpanded };
  }

  componentDidMount() {
    /* This forces the browser to preload the image so it's ready to be
     * shown in the popup -- no state management needed!
     */
    if (this.props.showCropped) {
      const croppedImage = new Image();
      croppedImage.src = this.getCropURL().url;
    }
    let cropMargin = parseFloat(CROP_MARGINS[this.props.cropMargin]);
    let resizeRatio = (parseFloat(this.props.coords.width) * parseFloat(this.props.coords.height)) / ((cropMargin + parseFloat(this.props.coords.width)) * (cropMargin + parseFloat(this.props.coords.height)));
    let contextCropMargin = Math.round(cropMargin * resizeRatio);
    if (isNaN(contextCropMargin)) {
      console.log("contextCropMargin isNaN in componentDidMount");
      console.log(this.props.coords);
    }
    const contextImage = new Image();
    contextImage.src = this.getCropURL(contextCropMargin).url;
  }

  render() {
    let coordsWidth = this.props.coords.width;
    let coordsHeight = this.props.coords.height;

    let maxDim = IMAGE_DIMS[this.props.imageSize];
    let dims = this.resizeKeepAspect(coordsWidth, coordsHeight, maxDim);

    let binarizedDiv = '';
    let croppedDiv = '';

    // note that for the central, non-context portion of the popup image
    // to be exactly the same size as the cropped/binarized images, it
    // needs to be scaled at the same factor as the cropped/binarized
    // images themselves

    let cropMargin = parseFloat(CROP_MARGINS[this.props.cropMargin]);
    let resizeRatio = (parseFloat(coordsWidth) * parseFloat(coordsHeight)) / ((cropMargin + parseFloat(coordsWidth)) * (cropMargin + parseFloat(coordsHeight)));
    let contextCropMargin = Math.round(cropMargin * resizeRatio);
    if (isNaN(contextCropMargin)) {
      console.log("contextCropMargin isNaN in render");
    }

    let contextURL = this.getCropURL(contextCropMargin).url;

    let contextImage = <img
                         alt={this.props.letter}
                         ref="context"
                         width={dims.width + contextCropMargin}
                         height={dims.height + contextCropMargin}
                         src={contextURL}
                       />

    if (this.props.showBinarized) {

      /* Dimensions of the displayed binarized image */
      //let dims = { coordsWidth, coordsHeight };
      //let maxDim = Math.max(coordsWidth, coordsHeight);

      let binarizedImage =
        <img
          alt={this.props.letter}
          ref="binarized"
          width={dims.width}
          height={dims.height}
          src={this.props.coords.binaryurl}
        />;

      binarizedDiv =
        <div className={"letter-item"}>
          <Popup trigger={binarizedImage} position="top center" on={this.props.contextMode}>
            {contextImage}
          </Popup>
        </div>;

    }

    if (this.props.showCropped) {

      let cropURL = this.getCropURL().url;
      //let cropDims = this.resizeKeepAspect(cropData.width, cropData.height, maxDim);

      let croppedImage =
        <img
          alt={this.props.letter}
          ref="cropped"
          width={dims.width}
          height={dims.height}
          src={cropURL}
        />
        
      croppedDiv =
        <div className={"letter-item"}>
          <Popup trigger={croppedImage} position="top center" on={this.props.contextMode}>
            {contextImage}
          </Popup>
        </div>;
    }

    return (
      <span className={"letter-row"}>
        { binarizedDiv }
        { croppedDiv }
      </span>
    )
  }
}

export default LetterImage;

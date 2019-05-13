import React from "react";

/* LetterImage - manages the display of all versions of a letter instance
 * in the scriptchart. These are all loaded from the backend server and
 * are either static images or extracted on demand from larger page images.
 * Depending on the options specified in the scriptchart options menu,
 * the letter image display may consist of one or two size-normalized
 * versions of the letter image its default margins: a binarized, "trimmed"
 * version of the image or an "untrimmed" version extracted directly from
 * the page image.
 * Upon mouseover or click (as specified in the form) of either letter
 * image type mentioned above, a size-normalized image of the letter with a
 * contextual margin around it (its general size also specified in the form)
 * will be displayed in a popover.
 */

import PopupImage from "./PopupImage";

import { API_ROOT } from "./App";

import "./index.css";

// Size of the largest dimension of the non-contextual letter images
const IMAGE_DIMS = { Small: 25, Medium: 50, Large: 100 };
// Ratio of the contextual margin size to the dimensions of the non-contextual
// image (Small = resulting image is 1.5 times as long and wide;
// Medium = resulting image is twice as long/wide, Large = 3X, X-Large = 5X)
const CROP_MARGINS = { Small: 0.25, Medium: 0.5, Large: 1, "X-Large": 2 };

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

  getCropURL(marginRatio = 0) {
    /* Compute dimensions of the cropped manuscript image, including any
     * user-specified contextual margin around it, and construct a URL
     * to request this image from the backend.
     */

    let xMarginSize = Math.round(this.props.coords.width * marginRatio);
    let yMarginSize = Math.round(this.props.coords.height * marginRatio);

    let leftExpanded = Math.max(0, this.props.coords.left - xMarginSize);
    let topExpanded = Math.max(0, this.props.coords.top - yMarginSize);
    let rightExpanded = Math.min(
      this.props.coords.pagewidth,
      this.props.coords.left + this.props.coords.width + xMarginSize
    );
    let widthExpanded = rightExpanded - leftExpanded;
    let bottomExpanded = Math.min(
      this.props.coords.pageheight,
      this.props.coords.top + this.props.coords.height + yMarginSize
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

  render() {
    let coordsWidth = this.props.coords.width;
    let coordsHeight = this.props.coords.height;

    /* Compute the dimensions of the binarized and non-context-having
     * letter image versions.
     */
    let maxDim = IMAGE_DIMS[this.props.imageSize];
    let dims = this.resizeKeepAspect(coordsWidth, coordsHeight, maxDim);

    let binarizedDiv = "";
    let croppedDiv = "";

    /* Compute the size of the context-inclusive image */
    let cropMargin = parseFloat(CROP_MARGINS[this.props.cropMargin]);

    let contextURL = this.getCropURL(cropMargin);

    let contextWidth = dims.width + 2 * Math.round(dims.width * cropMargin);
    let contextHeight = dims.height + 2 * Math.round(dims.height * cropMargin);

    /* The context-inclusive image should always be loaded -- it will always
     * be displayed as a popup of the binarized or "untrimmed" image on click
     * or hover.
     */
    let contextImage = (
      <img
        alt={this.props.letter}
        ref="context"
        width={contextWidth}
        height={contextHeight}
        src={contextURL}
      />
    );

    if (this.props.showBinarized) {
      let binarizedImage = (
        <img
          alt={this.props.letter}
          ref="binarized"
          width={dims.width}
          height={dims.height}
          src={this.props.coords.binaryurl}
        />
      );

      binarizedDiv = (
        <PopupImage
          triggerImage={binarizedImage}
          contextMode={this.props.contextMode}
          contextImage={contextImage}
          contextWidth={contextWidth}
          contextHeight={contextHeight}
        />
      );
    }

    if (this.props.showCropped) {
      let cropURL = this.getCropURL();

      let croppedImage = (
        <img
          alt={this.props.letter}
          ref="cropped"
          width={dims.width}
          height={dims.height}
          src={cropURL}
        />
      );

      croppedDiv = (
        <PopupImage
          triggerImage={croppedImage}
          contextMode={this.props.contextMode}
          contextImage={contextImage}
          contextWidth={contextWidth}
          contextHeight={contextHeight}
        />
      );
    }

    return (
      <div className={"letter-block"}>
        <div className={"letter-column"}>
          {binarizedDiv}
          {croppedDiv}
        </div>
      </div>
    );
  }
}

export default LetterImage;

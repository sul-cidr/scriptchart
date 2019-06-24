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

import { IMAGE_SERVER_ROOT } from "./App";

// Size of the largest dimension of the non-contextual letter images
const IMAGE_DIMS = { Small: 25, Medium: 50, Large: 100 };
const CONTEXT_IMAGE_WIDTHS = { small: 250, med: 400, large: 500 };

class LetterImage extends React.Component {
  constructor(props) {
    super(props);
    this.resizeKeepAspect = this.resizeKeepAspect.bind(this);
  }

  resizeKeepAspect(inWidth, inHeight, maxDim) {
    let hwRatio = parseFloat(inHeight) / parseFloat(inWidth);
    if (inWidth >= inHeight) {
      return { height: Math.round(hwRatio * maxDim), width: maxDim };
    } else {
      return { height: maxDim, width: Math.round(maxDim / hwRatio) };
    }
  }

  composeImageURL(imageType) {
    return (
      `${IMAGE_SERVER_ROOT}${imageType}/` +
      `${this.props.msSlug}/${this.props.coords.page}_` +
      `${this.props.letter}_${this.props.coords.left}_` +
      `${this.props.coords.top}_${this.props.coords.width}_` +
      `${this.props.coords.height}.png`
    );
  }

  composeTrimmedImageURL() {
    return this.composeImageURL("trimmed");
  }

  composeUntrimmedImageURL() {
    return this.composeImageURL("untrimmed");
  }

  composeContextImageURL(contextSize) {
    return this.composeImageURL(`context/${contextSize}`);
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

    /* The context-inclusive image should always be loaded -- it will always
     * be displayed as a popup of the binarized or "untrimmed" image on click
     * or hover.
     */

    let contextURL = this.composeContextImageURL(this.props.contextSize);

    let contextImage = (
      <img alt={this.props.letter} ref="context" src={contextURL} />
    );

    if (this.props.showBinarized) {
      let trimmedImageURL = this.composeTrimmedImageURL();
      let binarizedImage = (
        <img
          alt={this.props.letter}
          ref="binarized"
          width={dims.width}
          height={dims.height}
          src={trimmedImageURL}
        />
      );

      binarizedDiv = (
        <PopupImage
          triggerImage={binarizedImage}
          contextMode={this.props.contextMode}
          contextImage={contextImage}
          width={CONTEXT_IMAGE_WIDTHS[this.props.contextSize]}
        />
      );
    }

    if (this.props.showCropped) {
      let untrimmedImageURL = this.composeUntrimmedImageURL();

      let croppedImage = (
        <img
          alt={this.props.letter}
          ref="cropped"
          width={dims.width}
          height={dims.height}
          src={untrimmedImageURL}
        />
      );

      croppedDiv = (
        <PopupImage
          triggerImage={croppedImage}
          contextMode={this.props.contextMode}
          contextImage={contextImage}
          width={CONTEXT_IMAGE_WIDTHS[this.props.contextSize]}
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

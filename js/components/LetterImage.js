import React from "react";

/* LetterImage - displays a letter image retrieved from
 * a URL that points to the image on the backend server.
 * It also resizes the image according to the size specified
 * in the configuration form, maintaining the aspect ratio
 * of the original.
 */

const SMALL_DIM = 25;
const MEDIUM_DIM = 50;
const LARGE_DIM = 100;

class LetterImage extends React.Component {
  constructor(props) {
    super(props);

    this.resizeKeepAspect = this.resizeKeepAspect.bind(this);
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

  render() {
    let imgWidth = this.props.coords["width"];
    let imgHeight = this.props.coords["height"];

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

    return (
      <span style={{ display: "inline-block" }}>
        {/*<canvas ref="canvas" width={maxDim} height={maxDim}  />
        <img ref="image" src={this.props.coords.binaryurl} className="hidden" />*/}
        <img
          alt="Syriac letter"
          ref="image"
          width={dims["width"]}
          height={dims["height"]}
          src={this.props.coords.binaryurl}
        />
      </span>
    );
  }
}

export default LetterImage;

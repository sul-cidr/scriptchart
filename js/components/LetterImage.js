import React from "react";

class LetterImage extends React.Component {
  constructor(props) {
    super(props);

    this.resizeKeepAspect = this.resizeKeepAspect.bind(this);
  }

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
      return { 'height': Math.round(hwRatio * maxDim), 'width': maxDim };
    } else {
      return { 'height': maxDim, 'width': Math.round(maxDim / hwRatio) };
    }
  }

  render() {

    let imgWidth = this.props.coords["width"];
    let imgHeight = this.props.coords["height"];

    let dims={imgWidth, imgHeight};
    let maxDim = Math.max(imgWidth, imgHeight);
    if (this.props.sizeClass == "Small") {
      maxDim = 25;
      dims = this.resizeKeepAspect(imgWidth, imgHeight, maxDim);
    } else if (this.props.sizeClass == "Medium") {
      maxDim = 50;
      dims = this.resizeKeepAspect(imgWidth, imgHeight, maxDim);
    } else {
      maxDim = 100;
      dims = this.resizeKeepAspect(imgWidth, imgHeight, maxDim);
    }

    //console.log("Image input wh is " + imgWidth + "," + imgHeight + " resized is " + dims['width'] + "," + dims['height']);

    return (
      <span style={{display: "inline-block"}}>
        {/*<canvas ref="canvas" width={maxDim} height={maxDim}  />
        <img ref="image" src={this.props.coords.binaryurl} className="hidden" />*/}
        <img ref="image" width={dims['width']} height={dims['height']} src={this.props.coords.binaryurl} />
      </span>
    );
  }
}

export default LetterImage;
